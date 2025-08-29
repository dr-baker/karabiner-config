/**
 * SYSTEM RULES
 * ===========
 *
 * Core system-level rules including leader key functionality and
 * global navigation controls.
 */

import {
  map,
  mapSimultaneous,
  withCondition,
  ifVar,
  toUnsetVar,
  toRemoveNotificationMessage,
  withMapper,
  toVar,
  toNotificationMessage,
} from 'karabiner.ts'

import { THRESHOLD } from '../config/constants'
import { LEADER_MAPPINGS, SYSTEM_CONTROLS } from '../config/mappings'
import { createRule, mapKey } from '../dsl/helpers'

// =============================================================================
// LEADER KEY SYSTEM
// =============================================================================

/**
 * Creates the leader key rule - Press l+; to activate, then press keys for quick actions.
 * Shows a notification with available options when activated.
 */
export function createLeaderRule() {
  const leaderVar = 'leader'
  const escapeSequence = [toUnsetVar(leaderVar), toRemoveNotificationMessage(leaderVar)]

  const availableKeys = Object.keys(LEADER_MAPPINGS) as Array<keyof typeof LEADER_MAPPINGS>
  const hintText = availableKeys.map(key => `[\t${key}\t]\t${LEADER_MAPPINGS[key].name}`).join('\n')

  return createRule('Leader Key', [
    // Activate leader mode on l+;
    withCondition(ifVar(leaderVar, 0))([
      mapSimultaneous(['l', ';'], undefined, THRESHOLD)
        .toVar(leaderVar, 1)
        .toNotificationMessage(leaderVar, hintText),
    ]),

    // Escape from leader mode
    withCondition(ifVar(leaderVar, 0).unless())([
      withMapper(['⎋', '⇪'])((key) => map(key).to(escapeSequence)),
    ]),

    // Show submenu options
    ...withCondition(ifVar(leaderVar, 1))(
      availableKeys.map(key => {
        const submenuHint = Object.entries(LEADER_MAPPINGS[key].mapping)
          .map(([subKey, value]) => `[\t${subKey}\t]\t${Array.isArray(value) ? value[1] : value}`)
          .join('\n')
        return map(key).toVar(leaderVar, key).toNotificationMessage(leaderVar, submenuHint)
      })
    ),

    // Execute actions from submenus
    ...availableKeys.flatMap(key => {
      const { mapping, action } = LEADER_MAPPINGS[key]
      const actionKeys = Object.keys(mapping) as Array<keyof typeof mapping>
      return withCondition(ifVar(leaderVar, key))(
        actionKeys.map(subKey => {
          const value = Array.isArray(mapping[subKey]) ? mapping[subKey][0] : mapping[subKey]
          return map(subKey).to(action(value)).to(escapeSequence)
        })
      )
    }),
  ])
}

// =============================================================================
// SYSTEM CONTROLS
// =============================================================================

/**
 * Converts system control mappings into Karabiner manipulators.
 * @returns Array of key mapping manipulators
 */
export function createSystemControls() {
  return Object.entries(SYSTEM_CONTROLS).map(([_, mapping]) =>
    mapKey(mapping.from[0], mapping.from[1], mapping.to[0], mapping.to[1])
  )
}
