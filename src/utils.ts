/**
 * UTILITY FUNCTIONS FOR KARABINER CONFIGURATION
 * ===========================================
 *
 * This file contains helper functions for creating key mappings,
 * handling shell commands, and managing complex keyboard behaviors.
 */

import {
  type KeyAlias,
  type LetterKeyCode,
  map,
  mapSimultaneous,
  type ModifierKeyAlias,
  modifierKeyAliases,
  type MultiModifierAlias,
  multiModifierAliases,
  type SideModifierAlias,
  to$,
  type ToEvent,
  toRemoveNotificationMessage,
  type FromKeyParam,
  type ModifierParam,
  type ToKeyParam,
} from 'karabiner.ts'

// =============================================================================
// MODIFIER HELPER FUNCTIONS
// =============================================================================

/**
 * Creates tap-to-modifier mappings for multiple keys.
 * @param v - Object mapping modifier keys to their tap actions
 * @returns Array of manipulator objects
 */
export function tapModifiers(
  v: Partial<Record<SideModifierAlias | 'fn', ToEvent>>
) {
  return Object.entries(v).map(([k, to]) => {
    const key = k as SideModifierAlias | 'fn'
    return map(key).to(key).toIfAlone(to)
  })
}

/**
 * Creates a tap-to-modifier mapping for a single key.
 * @param v - Object mapping one modifier key to its tap action
 * @returns Single manipulator object
 */
export function tapModifier(
  v: Partial<Record<SideModifierAlias | 'fn', ToEvent>>
) {
  const [k, to] = Object.entries(v)[0]
  const key = k as SideModifierAlias | 'fn'
  return map(key).to(key).toIfAlone(to)
}

// =============================================================================
// EXTERNAL APPLICATION INTEGRATIONS
// =============================================================================

/**
 * Opens a Raycast extension.
 * @param name - Raycast extension identifier
 */
export function raycastExt(name: string) {
  return to$(`open raycast://extensions/${name}`)
}

/**
 * Opens a Raycast window management command.
 * @param name - Raycast window management command
 */
export function raycastWin(name: string) {
  return to$(`open -g raycast://extensions/raycast/window-management/${name}`)
}

// =============================================================================
// SYSTEM INTEGRATION FUNCTIONS
// =============================================================================

/**
 * Creates an AppleScript command to resize and position an application window.
 * @param app - Application name
 * @param position - Window position {x, y}
 * @param size - Window size {w, h}
 */
export function toResizeWindow(
  app: string,
  position = { x: 0, y: 220 }, // Default: first window below menu bar
  size = { w: 1262, h: 1220 }, // Default: 1/4 width, full height minus menu
) {
  return to$(`osascript -e '\
set windowPosition to {${position.x}, ${position.y}}
set windowSize to {${size.w}, ${size.h}}

tell application "System Events"
  tell process "${app}"
    set frontWindow to first window
    set position of frontWindow to windowPosition
    set size of frontWindow to windowSize
  end tell
end tell'`)
}

/**
 * Opens a macOS System Settings pane.
 * @param pane - Settings pane identifier (e.g., 'Appearance', 'Keyboard')
 */
export function toSystemSetting(pane: string) {
  const path = `/System/Library/PreferencePanes/${pane}.prefPane`
  return to$(`open -b com.apple.systempreferences ${path}`)
}

// =============================================================================
// KEY MAPPING UTILITIES
// =============================================================================

/**
 * Creates bidirectional modifier swaps for a set of keys.
 * For example, swaps Command and Option on arrow keys.
 * @param keys - Array of keys to swap modifiers on
 * @param modA - First modifier
 * @param modB - Second modifier
 * @returns Array of key mapping manipulators (both directions)
 */
export function swapModifiersForKeys(
  keys: readonly FromKeyParam[],
  modA: ModifierParam,
  modB: ModifierParam,
) {
  return keys.flatMap((key) => [
    map(key, modA).to(key as ToKeyParam, modB),
    map(key, modB).to(key as ToKeyParam, modA),
  ])
}

/**
 * Creates a toggleable autoclicker that starts/stops based on current state.
 * Uses background process management with PID tracking.
 *
 * @param intervalSeconds - Time between clicks (default: 0.06s = ~16 CPS)
 * @param clickType - Type of click: 'left', 'right', 'double', 'triple'
 * @param options - Additional options (e.g., 'natural', 'verbose')
 * @returns Karabiner shell command manipulator
 *
 * @requires cliclick - Install with `brew install cliclick`
 * @example
 * // Left-click every 0.1 seconds
 * toToggleAutoClicker(0.1, 'left')
 *
 * // Right-click with natural timing
 * toToggleAutoClicker(0.06, 'right', 'natural')
 */
export function toToggleAutoClicker(
  intervalSeconds = 0.06,
  clickType = 'left',
  options = ''
) {
  const scriptPath = './scripts/autoclicker.sh'
  return to$(`bash -c "cd '${process.cwd()}' && ${scriptPath} ${intervalSeconds} ${clickType} ${options}"`)
}
