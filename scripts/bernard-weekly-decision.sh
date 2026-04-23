#!/usr/bin/env bash
# TCP Bernard Weekly Decision — cron wrapper (Fri 9am PT)
set -u

REPO_DIR="/Users/bcarter/Desktop/Claude Agents/projects/tiktok-creativity-program"
LOG_DIR="$REPO_DIR/logs"
TS="$(date -u +%Y-%m-%d)"
LOG_FILE="$LOG_DIR/bernard-weekly-decision-$TS.log"

mkdir -p "$LOG_DIR"
cd "$REPO_DIR" || { echo "Cannot cd to $REPO_DIR"; exit 1; }

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

export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"

{
  echo "=== bernard-weekly-decision $(date -u +%Y-%m-%dT%H:%M:%SZ) ==="
  node "$REPO_DIR/scripts/bernard-weekly-decision.mjs"
  echo "=== exit $? ==="
} >>"$LOG_FILE" 2>&1
