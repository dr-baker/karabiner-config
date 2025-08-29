/**
 * APP-SPECIFIC RULES
 * =================
 *
 * Rules that only apply when specific applications are active.
 * Each app gets its own optimized key mappings.
 */

import { map, toKey } from 'karabiner.ts'
import { APP_IDS } from '../config/constants'
import { APP_CONTROLS } from '../config/mappings'
import { createAppRule } from '../dsl/helpers'
import { toResizeWindow, tapModifiers } from '../utils'

// =============================================================================
// ARC BROWSER
// =============================================================================

/**
 * Creates app-specific rules for Arc browser.
 * Provides sidebar toggles, tab switching, and window resizing.
 */
export function createArcRule() {
  return createAppRule('Arc Browser', APP_IDS.arc, [
    // Sidebar and navigation controls
    ...tapModifiers({
      [APP_CONTROLS.swapTab]: toKey('tab', '⌃'),       // Ctrl+Tab (switch tabs)
      [APP_CONTROLS.leftSidebar]: toKey('s', '⌘'),     // Cmd+S (toggle left sidebar)
      [APP_CONTROLS.rightSidebar]: toKey('i', '⌘⌥'),   // Cmd+Opt+I (dev tools)
      [APP_CONTROLS.search]: toKey('l', '⌘'),          // Cmd+L (focus address bar)
    }),

    // Window resizing (Meh = Cmd+Opt+Ctrl)
    map(1, 'Meh').to(toResizeWindow('Google Chrome')),
  ])
}

// =============================================================================
// CURSOR IDE
// =============================================================================

/**
 * Creates app-specific rules for Cursor IDE.
 * Provides navigation controls and sidebar management.
 */
export function createCursorRule() {
  return createAppRule('Cursor IDE', APP_IDS.cursor, [
    // Navigation overrides (Vim-style)
    map('h', '⌃').to('-', '⌃'),    // Ctrl+H → Ctrl+- (zoom out)
    map('l', '⌃').to('-', '⌃⇧'),  // Ctrl+L → Ctrl+Shift+- (zoom in)

    // IDE-specific controls
    ...tapModifiers({
      [APP_CONTROLS.leftSidebar]: toKey('b', '⌘⌥'),  // Cmd+Opt+B (toggle left sidebar)
      [APP_CONTROLS.rightSidebar]: toKey('b', '⌘'),   // Cmd+B (toggle right sidebar)
      [APP_CONTROLS.swapTab]: toKey('f5', '⌃'),       // Ctrl+F5 (run/debug)
      [APP_CONTROLS.search]: toKey('p', '⌘'),         // Cmd+P (quick open)
    }),
  ])
}

// =============================================================================
// SLACK
// =============================================================================

/**
 * Creates app-specific rules for Slack.
 * Provides sidebar controls and window management.
 */
export function createSlackRule() {
  return createAppRule('Slack', APP_IDS.slack, [
    // Slack-specific navigation
    ...tapModifiers({
      [APP_CONTROLS.leftSidebar]: toKey('d', '⌘⇧'),  // Cmd+Shift+D (toggle sidebar)
      [APP_CONTROLS.swapTab]: toKey('f6'),           // F6 (next section)
      [APP_CONTROLS.rightSidebar]: toKey('.', '⌘'),  // Cmd+. (hide right bar)
    }),

    // Window positioning (Meh = Cmd+Opt+Ctrl)
    map(1, 'Meh').to(
      toResizeWindow('Slack', { x: 2294, y: 526 }, { w: 1146, h: 914 })
    ),
  ])
}
