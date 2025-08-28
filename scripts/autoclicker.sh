#!/bin/zsh

# Autoclicker script for Karabiner-Elements
# Usage: ./autoclicker.sh [interval_seconds] [click_type] [options]
# click_type: left, right, double, triple
# options: natural (adds easing), verbose (debug output)

# Get script directory for relative paths
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

INTERVAL=${1:-0.01}
CLICK_TYPE=${2:-left}
OPTIONS=${3:-}

# Parse options
NATURAL=false
VERBOSE=false
if [[ "$OPTIONS" == *"natural"* ]]; then NATURAL=true; fi
if [[ "$OPTIONS" == *"verbose"* ]]; then VERBOSE=true; fi

# Use project-relative paths
LOG_FILE="$PROJECT_ROOT/karabiner-test.log"
PID_FILE="/tmp/karabiner-autoclick.pid"

echo "$(date): Autoclicker toggle triggered" >> "$LOG_FILE"

  # Set up PATH to match terminal environment
  # Use a more portable PATH setup
  export PATH="/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"

# Check if cliclick is available
if ! command -v cliclick >/dev/null 2>&1; then
  echo "$(date): cliclick not found in PATH" >> "$LOG_FILE"
  osascript -e "display notification \"Install cliclick: brew install cliclick\" with title \"Autoclicker\""
  exit 0
fi

echo "$(date): cliclick found at $(which cliclick)" >> "$LOG_FILE"

# Check if autoclicker is already running
if [ -f "$PID_FILE" ] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null; then
  # Stop autoclicker
  echo "$(date): Stopping autoclicker (PID: $(cat "$PID_FILE"))" >> "$LOG_FILE"
  kill "$(cat "$PID_FILE")" 2>/dev/null || true
  rm -f "$PID_FILE"
  osascript -e "display notification \"Autoclicker stopped\" with title \"Autoclicker\""
  echo "$(date): Autoclicker stopped successfully" >> "$LOG_FILE"
else
  # Start autoclicker
  echo "$(date): Starting autoclicker" >> "$LOG_FILE"
  # Build cliclick command with options
  CLICK_CMD=""
  case "$CLICK_TYPE" in
    "right") CLICK_CMD="rc:." ;;
    "double") CLICK_CMD="dc:." ;;
    "triple") CLICK_CMD="tc:." ;;
    *) CLICK_CMD="c:." ;; # left click
  esac
  
  # Add flags
  FLAGS=""
  if [ "$NATURAL" = true ]; then FLAGS="$FLAGS -e 3"; fi
  if [ "$VERBOSE" = true ]; then FLAGS="$FLAGS -m verbose"; fi
  
  # Convert interval to milliseconds for -w flag
  WAIT_MS=$(echo "$INTERVAL * 1000" | bc -l | cut -d. -f1)
  if [ "$WAIT_MS" -lt 20 ]; then WAIT_MS=20; fi
  
  nohup env PATH="$PATH" /bin/zsh -c "while :; do cliclick $FLAGS -w $WAIT_MS $CLICK_CMD; done" >/dev/null 2>&1 & echo $! > "$PID_FILE"
  osascript -e "display notification \"Autoclicker started (${INTERVAL}s)\" with title \"Autoclicker\""
  echo "$(date): Autoclicker started successfully (PID: $(cat "$PID_FILE"))" >> "$LOG_FILE"
fi
