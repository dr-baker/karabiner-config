#!/bin/bash
# Simple test script for Karabiner
osascript -e 'display notification "Karabiner test successful!" with title "Test"'
echo "$(date): Karabiner test triggered" > "$(dirname "$0")/../karabiner-test.log"
echo "Test notification sent and log file created in project directory"
