#!/usr/bin/env bash
# TCP Weekly Guide Digest — cron wrapper
# Sources .env.local or .env (first one that exists), cds into repo root,
# then runs the digest script, logging to logs/weekly-digest-YYYY-MM-DD.log
set -u

REPO_DIR="/Users/bcarter/Desktop/Claude Agents/projects/tiktok-creativity-program"
LOG_DIR="$REPO_DIR/logs"
TS="$(date -u +%Y-%m-%d)"
LOG_FILE="$LOG_DIR/weekly-digest-$TS.log"

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

# Ensure node is on PATH for cron invocations
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"

{
  echo "=== weekly-digest $(date -u +%Y-%m-%dT%H:%M:%SZ) ==="
  node "$REPO_DIR/scripts/send-weekly-digest.mjs"
  echo "=== exit $? ==="
} >>"$LOG_FILE" 2>&1
