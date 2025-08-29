/**
 * KARABINER-ELEMENTS CONFIGURATION
 * ===============================
 *
 * Main entry point for the comprehensive keyboard remapping system.
 * This file orchestrates all rules and layers from organized modules.
 *
 * KEY CONCEPTS:
 * - Layers: Hold a key to activate a layer (e.g., s+; for symbols)
 * - Leader Key: Press l+; to activate leader mode, then press keys for actions
 * - App Rules: Automatic bindings when specific applications are active
 * - DSL Helpers: Clean abstraction layer for creating rules and mappings
 */

import { writeToProfile } from 'karabiner.ts'

// Import configuration constants
import { THRESHOLD } from './config/constants'

// Import DSL helpers
import { createRule } from './dsl/helpers'

// Import all rule implementations
import {
  createLeaderRule,
  createSystemControls,
  createSymbolLayer,
  createDigitLayer,
  createSystemLayer,
  createArcRule,
  createCursorRule,
  createSlackRule,
  createHyperRule,
  createCapsHyperRule,
  createAppShortcutsRule,
  createSnippetsRule,
  createWindowsWordBehaviorRule,
  createShiftBackspaceRule,
  createWindowsCommandRule,
  createWindowsCapsRule,
} from './rules'

// =============================================================================
// PROFILE CONFIGURATION - Main entry point that writes to Karabiner
// =============================================================================

/**
 * GENERAL PROFILE - Main configuration for macOS productivity
 * Contains all layers, app rules, and global key mappings
 */
writeToProfile('General', [
  // ===========================================================================
  // CORE LAYERS - Hold keys to activate different layer modes
  // ===========================================================================
  createLeaderRule(),                       // l+; → Leader mode for quick actions
  createRule('System Controls', createSystemControls()), // Global navigation controls
  createSymbolLayer(),                      // s+; → Symbol layer (!@#$ etc.)
  createDigitLayer(),                       // d+; → Numpad/delete layer
  createSystemLayer(),                      // ` (backtick) → System layer

  // ===========================================================================
  // APP-SPECIFIC RULES - Automatic bindings when apps are active
  // ===========================================================================
  createArcRule(),                          // Arc browser bindings
  createCursorRule(),                       // Cursor IDE bindings
  createSlackRule(),                        // Slack bindings

  // ===========================================================================
  // MODIFIER & UTILITY RULES - Global key remappings
  // ===========================================================================
  createHyperRule(),                        // Right Option + Right Shift → Hyper
  createCapsHyperRule(),                    // Caps Lock → Hyper (if held)
  createAppShortcutsRule(),                 // Hyper + keys → Launch apps
  createSnippetsRule(),                     // Text snippet shortcuts
  createWindowsWordBehaviorRule(),          // Windows-style word navigation
  createShiftBackspaceRule(),               // Shift+Backspace → Forward delete
], {
  // Timing settings for layer activation and simultaneous key detection
  'basic.simultaneous_threshold_milliseconds': THRESHOLD,
  'duo_layer.threshold_milliseconds': THRESHOLD,
  'duo_layer.notification': true,
})

/**
 * WINDOWS PROFILE - Windows-style keyboard layout compatibility
 * Maps common Windows shortcuts to macOS equivalents
 */
writeToProfile('Windows', [
  // Windows-style command/control swapping
  // createWindowsCommandRule(),            // Uncomment to swap Cmd/Ctrl
  createWindowsCapsRule(),                  // Caps Lock → Mouse button 3 + V
  createShiftBackspaceRule(),               // Shift+Backspace → Forward delete
], {
  'basic.simultaneous_threshold_milliseconds': THRESHOLD,
  'duo_layer.threshold_milliseconds': THRESHOLD,
  'duo_layer.notification': true,
})