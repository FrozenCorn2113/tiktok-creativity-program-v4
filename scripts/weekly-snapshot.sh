#!/usr/bin/env bash
# TCP Weekly Analytics Snapshot — cron wrapper
# Sources .env.local or .env (first one that exists), cds into repo root,
# then runs the snapshot script, logging to logs/weekly-snapshot-YYYY-MM-DD.log
#
# Exports SUPABASE_SERVICE_ROLE_KEY so the snapshot can read email_subscribers
# past RLS (anon key returns 0 rows).
set -u

REPO_DIR="/Users/bcarter/Desktop/Claude Agents/projects/tiktok-creativity-program"
LOG_DIR="$REPO_DIR/logs"
TS="$(date -u +%Y-%m-%d)"
LOG_FILE="$LOG_DIR/weekly-snapshot-$TS.log"

mkdir -p "$LOG_DIR"

cd "$REPO_DIR" || { echo "Cannot cd to $REPO_DIR"; exit 1; }

# Load env (prefer .env.local if present, else .env)
ENV_FILE=""
if [ -f "$REPO_DIR/.env.local" ]; then
  ENV_FILE="$REPO_DIR/.env.local"
elif [ -f "$REPO_DIR/.env" ]; then
  ENV_FILE="$REPO_DIR/.env"
fi

if [ -n "$ENV_FILE" ]; then
  set -a
  # shellcheck disable=SC1090
  . "$ENV_FILE"
  set +a
fi

# Ensure the service role key is exported for the Node process.
# weekly-snapshot.mjs falls back to the anon key if unset, which RLS blocks.
export SUPABASE_SERVICE_ROLE_KEY="${SUPABASE_SERVICE_ROLE_KEY:-}"

# Ensure node is on PATH for cron invocations
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"

{
  echo "=== weekly-snapshot $(date -u +%Y-%m-%dT%H:%M:%SZ) ==="
  node "$REPO_DIR/scripts/weekly-snapshot.mjs"
  echo "=== exit $? ==="
} >>"$LOG_FILE" 2>&1
