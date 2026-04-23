#!/usr/bin/env bash
# TCP Dispatch Processor — polls review_requests for GO'd Bernard proposals
# and fires the downstream agent same-day. Cron: */10 * * * *
set -u

REPO_DIR="/Users/bcarter/Desktop/Claude Agents/projects/tiktok-creativity-program"
LOG_DIR="$REPO_DIR/logs"
TS="$(date -u +%Y-%m-%d)"
LOG_FILE="$LOG_DIR/dispatch-processor-$TS.log"

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
  echo "=== dispatch-processor $(date -u +%Y-%m-%dT%H:%M:%SZ) ==="
  node "$REPO_DIR/scripts/dispatch-processor.mjs"
  echo "=== exit $? ==="
} >>"$LOG_FILE" 2>&1
