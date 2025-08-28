#!/bin/bash

# Test autoclicker script - runs for 2 seconds then stops
# Usage: ./test-autoclicker.sh [click_type]
# click_type: left (default) or right

CLICK_TYPE=${1:-left}
SCRIPT_PATH="./scripts/autoclicker.sh"

echo "🧪 Testing autoclicker for 2 seconds..."
echo "Click type: $CLICK_TYPE"
echo "💡 Make sure you're in an app where clicks are visible (like a text editor)"

# Start the autoclicker
echo "Starting autoclicker..."
$SCRIPT_PATH 0.5 "$CLICK_TYPE"

# Wait 2 seconds
echo "Running for 2 seconds..."
sleep 2

# Stop the autoclicker
echo "Stopping autoclicker..."
$SCRIPT_PATH 0.5 "$CLICK_TYPE"

echo "✅ Test complete!"
echo "Check the log file for details: karabiner-test.log"
