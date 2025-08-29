/**
 * LAYER RULES
 * ===========
 *
 * Layer-based key mappings that activate when holding specific keys.
 * Includes symbol layer, digit layer, and system layer.
 */

import {
  duoLayer,
  map,
  toKey,
  toMouseCursorPosition,
  toPointingButton,
  toSleepSystem,
  to$,
  withMapper,
  type ToKeyParam,
} from 'karabiner.ts'

import { THRESHOLD } from '../config/constants'
import { createLayer } from '../dsl/helpers'
import { toToggleAutoClicker, toSystemSetting } from '../utils'

// =============================================================================
// SYMBOL LAYER
// =============================================================================

/**
 * Creates the symbol layer - Hold s+; to access special characters and symbols.
 * Maps keyboard keys to symbols like !@#$%^&*() etc.
 */
export function createSymbolLayer() {
  const hintText = `\
&   !  @ #    ^   {  [   (  $      ?  }  ]   )  %      _   +      ⌫
N  M  ,   .    H  J  K  L  ;      Y  U  I  O  P       ␣  ⏎      '`

  const symbolMappings = {
    '!': toKey(1, '⇧'),  // Shift+1
    '@': toKey(2, '⇧'),  // Shift+2
    '#': toKey(3, '⇧'),  // Shift+3
    $: toKey(4, '⇧'),    // Shift+4
    '%': toKey(5, '⇧'),  // Shift+5
    '^': toKey(6, '⇧'),  // Shift+6
    '&': toKey(7, '⇧'),  // Shift+7
    '*': toKey(8, '⇧'),  // Shift+8
    '(': toKey(9, '⇧'),  // Shift+9
    ')': toKey(0, '⇧'),  // Shift+0

    '[': toKey('['),     // Left bracket
    ']': toKey(']'),     // Right bracket
    '{': toKey('[', '⇧'), // Shift+[
    '}': toKey(']', '⇧'), // Shift+]

    '-': toKey('-'),     // Hyphen
    '=': toKey('='),     // Equals
    _: toKey('-', '⇧'),  // Shift+-
    '+': toKey('=', '⇧'), // Shift+=

    ';': toKey(';'),     // Semicolon
    '/': toKey('/'),     // Forward slash
    ':': toKey(';', '⇧'), // Shift+;
    '?': toKey('/', '⇧'), // Shift+/

    ',': toKey(','),     // Comma
    '.': toKey('.'),     // Period
    '<': toKey(',', '⇧'), // Shift+,
    '>': toKey('.', '⇧'), // Shift+.
  }

  const keyMappings = {
    y: '?', u: '}', i: ']', o: ')', p: '%',
    h: '^', j: '{', k: '[', l: '(', ';': '$',
    n: '&', m: '!', ',': '@', '.': '#',
    ']': '*', '␣': '_', '⏎': '+',
  }

  return duoLayer('s', ';')
    .threshold(THRESHOLD)
    .notification(hintText)
    .manipulators([
      withMapper(keyMappings)((key, symbol) => map(key).to(symbolMappings[symbol])),
      map("'").to(toKey('⌫')), // Delete key
    ])
}

// =============================================================================
// DIGIT LAYER
// =============================================================================

/**
 * Creates the digit/numpad layer - Hold d+; for number input and delete operations.
 * Provides keypad numbers, operators, and various delete key combinations.
 */
export function createDigitLayer() {
  const hintText = `\
0    1  2  3    4  5  6    7  8  9    +  -  /  *    .    ⌫_⌥_⌘  ⌦
N   M  ,   .     J  K  L    U  I  O    P  ;   /  ]    [      '   H   Y    \\`

  return duoLayer('d', ';')
    .threshold(THRESHOLD)
    .notification(hintText)
    .manipulators([
      // Numpad digits (0-9)
      withMapper([
        'n', // 0
        ...['m', ',', '.'], // 1, 2, 3
        ...['j', 'k', 'l'], // 4, 5, 6
        ...['u', 'i', 'o'], // 7, 8, 9
      ] as const)((key, index) => map(key).to(`keypad_${index}`)),

      // Mathematical operators
      map('p').to(toKey('=', '⇧')),     // + (Shift+=)
      map(';').to(toKey('-')),         // - (minus)
      map(']').to(toKey(8, '⇧')),      // * (Shift+8)
      map('[').to(toKey('keypad_period')), // . (decimal point)

      // Delete key variations
      map('\\').to(toKey('⌦')),        // Forward delete
      map("'").to(toKey('⌫')),         // Backspace
      map('h').to(toKey('⌫', '⌥')),    // Option+Delete (delete word)
      map('y').to(toKey('⌫', '⌘')),    // Cmd+Delete (delete line)

      // Function keys F1-F9
      ...[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => map(num).to(`f${num}`)),
    ])
}

// =============================================================================
// SYSTEM LAYER
// =============================================================================

/**
 * Creates the system layer - Hold backtick (`) for system controls and utilities.
 * Provides mouse controls, autoclickers, system settings, and testing tools.
 */
export function createSystemLayer() {
  const hintText = `\
Mouse: 1=top-right, ⏎=click, ␣=sleep
Tabs:  j=next, k=prev
Auto:  a=left, z=right, d=double, t=triple
Test:  b=test notification
Sys:   s=system settings`

  return createLayer('`', 'system', hintText)
    .manipulators({
      // Mouse controls
      1: toMouseCursorPosition({ x: '99%', y: 20, screen: 0 }), // Move to top-right
      '⏎': toPointingButton('button1'),  // Left click
      '␣': toSleepSystem(),              // Put system to sleep

      // Tab navigation
      j: toKey('⇥', '⌘'),    // Next tab (Cmd+Tab)
      k: toKey('⇥', '⌘⇧'),  // Previous tab (Cmd+Shift+Tab)

      // Autoclicker controls
      a: toToggleAutoClicker(0.001, 'left'),   // Left-click autoclicker
      z: toToggleAutoClicker(0.001, 'right'),  // Right-click autoclicker
      d: toToggleAutoClicker(0.1, 'double'),   // Double-click autoclicker
      t: toToggleAutoClicker(0.2, 'triple'),   // Triple-click autoclicker

      // Testing and system tools
      b: to$(`bash -c "cd '${process.cwd()}' && ./scripts/test-notification.sh"`), // Test notification
      s: toSystemSetting(''), // System settings
    })
}
