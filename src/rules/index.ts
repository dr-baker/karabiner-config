/**
 * RULES INDEX
 * ===========
 *
 * Centralized exports for all rule implementations.
 * Import from this file to get access to all rules.
 */

// Layer rules
export { createSymbolLayer, createDigitLayer, createSystemLayer } from './layers'

// App-specific rules
export { createArcRule, createCursorRule, createSlackRule } from './apps'

// Modifier rules
export {
  createHyperRule,
  createCapsHyperRule,
  createAppShortcutsRule,
  createSnippetsRule,
  createWindowsWordBehaviorRule,
  createWindowsCommandRule,
  createWindowsCapsRule,
  createShiftBackspaceRule
} from './modifiers'

// System rules
export { createLeaderRule, createSystemControls } from './system'
