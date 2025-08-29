/**
 * CONFIGURATION CONSTANTS
 * ======================
 *
 * Centralized settings, app identifiers, and type definitions used throughout
 * the Karabiner configuration.
 */

import type { FromKeyParam, ModifierParam, ToKeyParam } from 'karabiner.ts'

// =============================================================================
// TIMING AND THRESHOLDS
// =============================================================================

/** Timing threshold for duo layers (simultaneous key presses) and layer activation */
export const THRESHOLD = 50

// =============================================================================
// KEY DEFINITIONS
// =============================================================================

/** Keys used for navigation across different rules (history, tabs, etc.) */
export const NAVIGATION_KEYS = [
  'delete_or_backspace',
  'up_arrow',
  'down_arrow',
  'left_arrow',
  'right_arrow',
] as const

// =============================================================================
// APPLICATION IDENTIFIERS
// =============================================================================

/** App bundle identifiers for app-specific rules */
export const APP_IDS = {
  arc: '^company.thebrowser.Browser$',      // Arc browser
  cursor: '^com.todesktop.230313mzl4w4u92$', // Cursor IDE
  slack: '^com.tinyspeck.slackmacgap$',      // Slack
} as const

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

/** Type for system control mappings (from key combo to target key combo) */
export type ControlMapping = {
  from: readonly [FromKeyParam, ModifierParam]
  to: readonly [ToKeyParam, ModifierParam]
}
