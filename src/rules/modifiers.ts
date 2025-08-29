/**
 * MODIFIER RULES
 * =============
 *
 * Rules for creating and using modifier keys like Hyper, Meh, and Caps Lock.
 * Also includes app shortcuts and text snippets.
 */

import {
  map,
  toKey,
  toPaste,
  toApp,
  toPointingButton,
  hyperLayer,
} from 'karabiner.ts'

import { NAVIGATION_KEYS } from '../config/constants'
import { LEADER_MAPPINGS } from '../config/mappings'
import { createRule } from '../dsl/helpers'
import { swapModifiersForKeys } from '../utils'

// =============================================================================
// HYPER/MEH MODIFIERS
// =============================================================================

/**
 * Creates hyper/meh modifier mappings.
 * Right Option + Right Shift = Hyper, Right Command + Right Shift = Meh.
 */
export function createHyperRule() {
  return createRule('Hyper/Meh Modifiers', [
    map('›⌥', '›⇧').toHyper(),  // Right Option + Right Shift → Hyper
    map('›⌘', '›⇧').toMeh(),    // Right Command + Right Shift → Meh
    map('.', '⌥').to('end'),    // Option+. → End key
  ])
}

/**
 * Maps Caps Lock to Hyper key with fallback to Caps Lock when held with Shift.
 * Note: Caps Lock alone functionality may not work reliably on macOS.
 */
export function createCapsHyperRule() {
  return createRule('Caps Lock → Hyper', [
    map('⇪').toHyper().toIfAlone('caps_lock'),
    // TODO: Caps lock alone doesn't work reliably - see Karabiner issues
    map('⇪', '⇧').to('caps_lock'),  // Shift+Caps Lock → Toggle Caps Lock
  ])
}

// =============================================================================
// APP SHORTCUTS
// =============================================================================

/**
 * Creates hyper layer for quick app launching.
 * Hyper+A activates app launcher with visual hints.
 */
export function createAppShortcutsRule() {
  const hintText = Object.entries(LEADER_MAPPINGS.a.mapping)
    .map(([key, app]) => `[${key}] ${app}`)
    .join('\n')

  return hyperLayer('a')
    .description('Quick App Launcher')
    .leaderMode({ escape: ['spacebar', 'return_or_enter', 'escape'] })
    .notification(hintText)
    .manipulators(
      Object.entries(LEADER_MAPPINGS.a.mapping).reduce((acc, [key, app]) => ({
        ...acc,
        [key]: toApp(app)
      }), {})
    )
}

// =============================================================================
// TEXT SNIPPETS
// =============================================================================

/**
 * Creates text snippet shortcuts.
 * Shift+Space → Em dash, Hold minus → Separator line.
 */
export function createSnippetsRule() {
  return createRule('Text Snippets', [
    map('␣', '⇧').to(toKey('-', '⇧')),        // Shift+Space → Em dash (—)
    map('-').toIfHeldDown(toPaste('--------.')).toAfterKeyUp('-'), // Hold - → Separator line
  ])
}

// =============================================================================
// WINDOWS COMPATIBILITY
// =============================================================================

/**
 * Windows-style word navigation behavior.
 * Swaps Command/Option on navigation keys for Windows-like text editing.
 * Command becomes word navigation, Option becomes line navigation.
 */
export function createWindowsWordBehaviorRule() {
  return createRule('Windows Word Navigation', [
    // Swap Cmd/Option for single navigation
    ...swapModifiersForKeys(NAVIGATION_KEYS, 'command', 'option'),

    // Swap Cmd+Shift/Option+Shift for selection
    ...swapModifiersForKeys(NAVIGATION_KEYS, ['command', 'shift'], ['option', 'shift']),
  ])
}

/**
 * Windows-style Command/Control swap for compatibility.
 * Uncomment to swap Cmd/Ctrl keys (useful for Windows keyboards).
 */
export function createWindowsCommandRule() {
  return createRule('Windows Command/Control Swap', [
    map('left_command').to('left_control'),
    map('right_command').to('right_control'),
    map('left_control').to('left_command'),
    map('right_control').to('right_command'),
  ])
}

/**
 * Maps Caps Lock to middle mouse button with control+V fallback.
 * Useful for Windows-style middle-click paste behavior.
 */
export function createWindowsCapsRule() {
  return createRule('Windows Caps Lock Mapping', [
    map('caps_lock').toPointingButton('button3').toIfHeldDown('v', 'control'),
  ])
}

/**
 * Maps Shift+Backspace to Forward Delete for Windows compatibility.
 */
export function createShiftBackspaceRule() {
  return createRule('Shift+Backspace → Forward Delete', [
    map('delete_or_backspace', 'shift').to('delete_forward'),
  ])
}
