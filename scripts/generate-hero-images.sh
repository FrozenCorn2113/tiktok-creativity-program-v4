#!/usr/bin/env bash
# generate-hero-images.sh -- Standalone hero + thumb image generator for TCP guides
# Uses Gemini Imagen API. Idempotent: skips slugs that already have hero images.
# Designed to run as a daily cron until all guides have images.

set -euo pipefail

# ── Config ───────────────────────────────────────────────────────────────────
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
GUIDES_DIR="${PROJECT_ROOT}/content/guides"
IMAGES_DIR="${PROJECT_ROOT}/public/images/guides"
TMP_DIR="${PROJECT_ROOT}/scripts/.tmp-images"
LOG_PREFIX="[hero-gen]"

MAX_PER_RUN=30  # Daily quota limit; stop before hitting API rate limits
DELAY_SECONDS=3
MODEL="imagen-4.0-generate-001"

# Style prompt prefix from Vale's style guide
STYLE_PREFIX="Flat 2D editorial illustration. Warm palette: brand orange #F4A261, warm cream #FFF7ED, ink dark #111827, soft peach #FFE9D5. No text, no letterforms, no words. No gradients. No drop shadows. No photographs. Simple geometric shapes, clean lines, bold flat fills. Negative space used intentionally. Abstract conceptual composition. Aspect ratio 1.9:1 horizontal. Style: independent editorial publication, modern flat design, warm and calm."

# ── API Key ──────────────────────────────────────────────────────────────────
API_KEY="$(security find-generic-password -s "GEMINI_API_KEY" -w 2>/dev/null)" || {
    echo "${LOG_PREFIX} ERROR: Could not retrieve GEMINI_API_KEY from keychain"
    exit 1
}

API_URL="https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:predict?key=${API_KEY}"

# ── Setup ────────────────────────────────────────────────────────────────────
mkdir -p "${IMAGES_DIR}" "${TMP_DIR}"

echo "${LOG_PREFIX} Starting hero image generation at $(date)"
echo "${LOG_PREFIX} Project root: ${PROJECT_ROOT}"
echo "${LOG_PREFIX} Max images this run: ${MAX_PER_RUN}"

# ── Helper: read frontmatter field ───────────────────────────────────────────
get_frontmatter() {
    local file="$1"
    local field="$2"
    # Read between --- delimiters, find the field, strip quotes
    sed -n '/^---$/,/^---$/p' "$file" \
        | grep "^${field}:" \
        | head -1 \
        | sed "s/^${field}:[[:space:]]*//" \
        | sed 's/^"//' \
        | sed 's/"$//' \
        | sed "s/^'//" \
        | sed "s/'$//"
}

# ── Helper: build a unique prompt from title + category ──────────────────────
build_prompt() {
    local title="$1"
    local category="$2"
    local slug="$3"

    local suffix=""

    # Map category to an abstract visual concept
    case "${category,,}" in
        tools|equipment)
            suffix="Abstract arrangement of simplified tool shapes and geometric equipment forms, clean organized layout suggesting a toolkit, flat orange accent shapes on cream background with ink-dark structural elements."
            ;;
        strategy|strategies)
            suffix="Abstract upward-trending composition with stacked bars and rising diagonal lines, geometric arrow shapes pointing up-right, flat grid of squares suggesting planning and data, bold orange accent shapes anchoring the composition."
            ;;
        niche|niches)
            suffix="Abstract composition of overlapping geometric shapes suggesting a creative space, distinct zones of color with orange highlights, simplified forms that suggest a focused domain of expertise."
            ;;
        troubleshooting)
            suffix="Abstract composition suggesting diagnosis and resolution, geometric shapes with a gap being bridged, dotted lines connecting to solid forms, flat shapes implying investigation and problem-solving."
            ;;
        comparison|comparisons)
            suffix="Abstract split composition with two distinct zones divided by a clean line, contrasting geometric shapes on each side suggesting balanced comparison, symmetrical layout with orange and ink-dark elements."
            ;;
        monetization)
            suffix="Abstract composition of ascending geometric bars and circular coin-like shapes, flat horizontal layers suggesting revenue stacking, warm orange accent on cream background with clean ink-dark structural lines."
            ;;
        growth)
            suffix="Abstract composition of expanding concentric shapes and upward-flowing geometric forms, clean lines suggesting momentum and audience growth, bold orange focal point with radiating ink-dark elements."
            ;;
        "case study"|"case studies")
            suffix="Abstract narrative composition with a winding path through geometric milestones, simplified timeline flowing left to right, flat shapes marking key moments, warm orange highlights on cream background."
            ;;
        getting\ started|beginner|basics)
            suffix="Abstract composition of simple foundational shapes stacking upward, clean geometric building blocks in an orderly arrangement, welcoming open layout with warm orange entry point on cream background."
            ;;
        tax|taxes|legal)
            suffix="Abstract composition of organized rectangular document shapes and clean grid lines, simplified ledger-like arrangement, structured geometric forms suggesting order and compliance, ink-dark lines with orange accent."
            ;;
        country|international)
            suffix="Abstract composition of overlapping geometric territory shapes and simplified globe-like circular forms, flat regional zones in warm palette, clean dividing lines suggesting international boundaries."
            ;;
        *)
            # Generic fallback based on title keywords
            suffix="Abstract conceptual composition inspired by the theme of ${title}, geometric shapes and clean lines arranged in a balanced layout, warm orange accent on cream background with ink-dark structural elements."
            ;;
    esac

    echo "${STYLE_PREFIX} ${suffix}"
}

# ── Helper: call Imagen API ──────────────────────────────────────────────────
generate_image() {
    local prompt="$1"
    local output_png="$2"

    local payload
    payload=$(cat <<ENDJSON
{
  "instances": [
    {
      "prompt": $(printf '%s' "$prompt" | python3 -c 'import sys,json; print(json.dumps(sys.stdin.read()))')
    }
  ],
  "parameters": {
    "sampleCount": 1,
    "aspectRatio": "16:9",
    "outputOptions": {
      "mimeType": "image/png"
    }
  }
}
ENDJSON
)

    local response
    response=$(curl -s -w "\n%{http_code}" -X POST "${API_URL}" \
        -H "Content-Type: application/json" \
        -d "${payload}" \
        --max-time 120)

    local http_code
    http_code=$(echo "$response" | tail -1)
    local body
    body=$(echo "$response" | sed '$d')

    if [ "$http_code" = "429" ]; then
        echo "${LOG_PREFIX} API returned HTTP 429 — daily quota exhausted"
        echo "${LOG_PREFIX} Response: $(echo "$body" | head -5)"
        return 2  # Special return code for quota exhaustion
    fi

    if [ "$http_code" != "200" ]; then
        echo "${LOG_PREFIX} API returned HTTP ${http_code}"
        echo "${LOG_PREFIX} Response: $(echo "$body" | head -5)"
        return 1
    fi

    # Extract base64 image data from response
    local b64_data
    b64_data=$(echo "$body" | python3 -c '
import sys, json
data = json.load(sys.stdin)
preds = data.get("predictions", [])
if preds:
    print(preds[0].get("bytesBase64Encoded", ""))
else:
    print("")
')

    if [ -z "$b64_data" ]; then
        echo "${LOG_PREFIX} No image data in response"
        echo "${LOG_PREFIX} Response keys: $(echo "$body" | python3 -c 'import sys,json; print(list(json.load(sys.stdin).keys()))' 2>/dev/null || echo 'parse error')"
        return 1
    fi

    echo "$b64_data" | base64 -d > "$output_png"
    return 0
}

# ── Helper: convert PNG to hero + thumb WebP ─────────────────────────────────
convert_images() {
    local src_png="$1"
    local hero_out="$2"
    local thumb_out="$3"

    # Resize to 1200x630 hero using sips, then convert to WebP
    local hero_png="${TMP_DIR}/hero_resized.png"
    cp "$src_png" "$hero_png"
    sips -z 630 1200 "$hero_png" --out "$hero_png" >/dev/null 2>&1

    # Convert hero to WebP
    cwebp -q 85 "$hero_png" -o "$hero_out" >/dev/null 2>&1

    # Create thumb: crop center 400x300 from the hero
    # First resize hero to a size where center crop gives 400x300
    # Simpler: resize the source to 400px wide, then crop height to 300
    local thumb_png="${TMP_DIR}/thumb_resized.png"
    cp "$src_png" "$thumb_png"
    sips --resampleWidth 400 "$thumb_png" --out "$thumb_png" >/dev/null 2>&1

    # Get current height after resize
    local cur_height
    cur_height=$(sips -g pixelHeight "$thumb_png" | tail -1 | awk '{print $2}')

    if [ "$cur_height" -gt 300 ]; then
        # Crop from center: calculate top offset
        local offset=$(( (cur_height - 300) / 2 ))
        sips --cropToHeightWidth 300 400 "$thumb_png" --out "$thumb_png" >/dev/null 2>&1
    else
        # If shorter than 300, just resize to exact 400x300
        sips -z 300 400 "$thumb_png" --out "$thumb_png" >/dev/null 2>&1
    fi

    cwebp -q 80 "$thumb_png" -o "$thumb_out" >/dev/null 2>&1

    # Cleanup temp files
    rm -f "$hero_png" "$thumb_png"
}

# ── Main Loop ────────────────────────────────────────────────────────────────
generated=0
skipped=0
failed=0
consecutive_failures=0

for mdx_file in "${GUIDES_DIR}"/*.mdx; do
    [ -f "$mdx_file" ] || continue

    slug=$(basename "$mdx_file" .mdx)
    hero_path="${IMAGES_DIR}/hero-${slug}.webp"
    thumb_path="${IMAGES_DIR}/thumb-${slug}.webp"

    # Skip if hero already exists
    if [ -f "$hero_path" ]; then
        skipped=$((skipped + 1))
        continue
    fi

    # Check quota
    if [ "$generated" -ge "$MAX_PER_RUN" ]; then
        echo "${LOG_PREFIX} Reached max of ${MAX_PER_RUN} images for this run. Stopping."
        break
    fi

    # Read frontmatter
    title=$(get_frontmatter "$mdx_file" "title")
    category=$(get_frontmatter "$mdx_file" "category")

    if [ -z "$title" ]; then
        echo "${LOG_PREFIX} WARNING: No title found for ${slug}, using slug as title"
        title="$slug"
    fi
    if [ -z "$category" ]; then
        category="general"
    fi

    echo "${LOG_PREFIX} [$(( generated + 1 ))/${MAX_PER_RUN}] Generating: ${slug}"
    echo "${LOG_PREFIX}   Title: ${title}"
    echo "${LOG_PREFIX}   Category: ${category}"

    # Build prompt
    prompt=$(build_prompt "$title" "$category" "$slug")

    # Generate
    tmp_png="${TMP_DIR}/${slug}.png"
    gen_rc=0
    generate_image "$prompt" "$tmp_png" || gen_rc=$?

    if [ "$gen_rc" -eq 2 ]; then
        echo "${LOG_PREFIX} Quota exhausted. Stopping run cleanly. Will resume on next run."
        break
    elif [ "$gen_rc" -eq 0 ]; then
        # Convert to hero + thumb
        if convert_images "$tmp_png" "$hero_path" "$thumb_path"; then
            echo "${LOG_PREFIX}   Saved: hero-${slug}.webp + thumb-${slug}.webp"
            generated=$((generated + 1))
        else
            echo "${LOG_PREFIX}   ERROR: Image conversion failed for ${slug}"
            failed=$((failed + 1))
            rm -f "$hero_path" "$thumb_path"
        fi
        rm -f "$tmp_png"
    else
        echo "${LOG_PREFIX}   ERROR: API call failed for ${slug}"
        failed=$((failed + 1))
        consecutive_failures=$((consecutive_failures + 1))
        if [ "$consecutive_failures" -ge 3 ]; then
            echo "${LOG_PREFIX} 3 consecutive failures — stopping to avoid wasting time."
            break
        fi
    fi

    # Reset consecutive failures on success
    if [ "$gen_rc" -eq 0 ]; then
        consecutive_failures=0
    fi

    # Rate limit delay (skip on last image)
    if [ "$generated" -lt "$MAX_PER_RUN" ]; then
        sleep "$DELAY_SECONDS"
    fi
done

# ── Cleanup ──────────────────────────────────────────────────────────────────
rmdir "${TMP_DIR}" 2>/dev/null || true

# ── Summary ──────────────────────────────────────────────────────────────────
total_existing=$(ls "${IMAGES_DIR}"/hero-*.webp 2>/dev/null | wc -l | tr -d ' ')
total_guides=$(ls "${GUIDES_DIR}"/*.mdx 2>/dev/null | wc -l | tr -d ' ')
remaining=$((total_guides - total_existing))

echo ""
echo "${LOG_PREFIX} ── Run Complete ──────────────────────────"
echo "${LOG_PREFIX} Generated: ${generated}"
echo "${LOG_PREFIX} Skipped (already exist): ${skipped}"
echo "${LOG_PREFIX} Failed: ${failed}"
echo "${LOG_PREFIX} Total hero images: ${total_existing} / ${total_guides}"
echo "${LOG_PREFIX} Remaining: ${remaining}"
echo "${LOG_PREFIX} Finished at $(date)"

if [ "$remaining" -eq 0 ]; then
    echo "${LOG_PREFIX} All guides have hero images. You can remove the cron job."
fi

exit 0
