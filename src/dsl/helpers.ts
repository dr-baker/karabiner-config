/**
 * DSL HELPERS
 * ===========
 *
 * Clean abstraction layer for creating rules and mappings.
 * Provides high-level functions to simplify Karabiner configuration.
 */

import {
  rule,
  layer,
  map,
  ifApp,
  type FromKeyParam,
  type ModifierParam,
  type ToKeyParam,
} from 'karabiner.ts'

// =============================================================================
// CORE RULE CREATION
// =============================================================================

/**
 * Creates a basic rule with the given name and manipulators.
 * @param name - Human-readable rule name for Karabiner UI
 * @param manipulators - Array of key mapping manipulators
 */
export function createRule(name: string, manipulators: any[]) {
  return rule(name).manipulators(manipulators)
}

/**
 * Creates a layer with optional notification hint.
 * @param key - Key that activates the layer
 * @param name - Layer name for Karabiner UI
 * @param hint - Optional notification text shown when layer activates
 */
export function createLayer(key: any, name: string, hint?: string) {
  const layerInstance = layer(key, name)
  return hint ? layerInstance.notification(hint) : layerInstance
}

// =============================================================================
// KEY MAPPING HELPERS
// =============================================================================

/**
 * Creates a simple key mapping from one key combo to another.
 * @param fromKey - Source key
 * @param fromMod - Source modifier
 * @param toKey - Target key
 * @param toMod - Optional target modifier
 */
export function mapKey(fromKey: FromKeyParam, fromMod: ModifierParam, toKey: ToKeyParam, toMod?: ModifierParam) {
  return map(fromKey, fromMod).to(toKey as ToKeyParam, toMod)
}

/**
 * Creates an app-specific rule that only applies when the app is active.
 * @param name - Rule name
 * @param bundleId - App bundle identifier (e.g., '^com.apple.Safari$')
 * @param manipulators - Array of manipulators for this app
 */
export function createAppRule(name: string, bundleId: string, manipulators: any[]) {
  return rule(name, ifApp(bundleId)).manipulators(manipulators)
}
