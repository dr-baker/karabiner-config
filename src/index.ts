import {
  duoLayer,
  layer,
  mapSimultaneous,
  rule,
  simlayer,
  writeToProfile,
} from 'karabiner.ts'
import { appleKeyboard } from './devices/apple-keyboard'
import { ifMoonlander, mouseCursor } from './devices/moonlander'
import { appModifiers } from './rules/app-modifiers'
import { emojiSymbol } from './layers/emoji-symbol'
import { launchApp } from './layers/launch-app'
import { arrowDelete, arrowMode, arrowSelect } from './layers/arrows'
import { appOverrides } from './rules/app-overrides'

const rules = [
  rule('sim-modifiers').manipulators([
    // ‹⌘⌥⌃ == dsa + f
    mapSimultaneous(['f', 'd']).to('‹⌘'),
    mapSimultaneous(['f', 's']).to('‹⌥'),
    mapSimultaneous(['f', 'a']).to('‹⌃'),

    mapSimultaneous(['d', 's']).to('‹⇧'),

    // ‹⌘⌥⌃ + ⇧ == dsa + g
    mapSimultaneous(['g', 'd']).to('‹⌘', '⇧'),
    mapSimultaneous(['g', 's']).to('‹⌥', '⇧'),
    mapSimultaneous(['g', 'a']).to('‹⌃', '⇧'),

    mapSimultaneous(['v', 'c']).to('‹⌘', '⌥'),
    mapSimultaneous(['v', 'x']).to('‹⌘', '⌃'),
    mapSimultaneous(['c', 'x']).to('‹⌥', '⌃'),

    mapSimultaneous(['v', 'z']).to('‹⌃', '⌘⌥'), // ⌘⌥⌃

    // ›⌘⌥⌃ == kl; + j
    mapSimultaneous(['j', 'k']).to('›⌘'),
    mapSimultaneous(['j', 'l']).to('›⌥'),
    mapSimultaneous(['j', ';']).to('›⌃'),

    mapSimultaneous(['k', 'l']).to('›⇧'),

    // ›⌘⌥⌃ + ⇧ == kl; + h
    mapSimultaneous(['h', 'k']).to('›⌘', '⇧'),
    mapSimultaneous(['h', 'l']).to('›⌥', '⇧'),
    mapSimultaneous(['h', ';']).to('›⌃', '⇧'),

    mapSimultaneous(['m', ',']).to('›⌘', '⌥'),
    mapSimultaneous(['m', '.']).to('›⌘', '⌃'),
    mapSimultaneous([',', '.']).to('›⌥', '⌃'),

    mapSimultaneous(['m', '/']).to('›⌃', '⌘⌥'), // ⌘⌥⌃
  ]),

  simlayer('f', 'arrow-mode').manipulators(arrowMode),
  simlayer('d', 'arrow-delete').manipulators(arrowDelete),
  simlayer('s', 'arrow-select').manipulators(arrowSelect),

  duoLayer('z', 'x').manipulators(emojiSymbol),
  duoLayer('l', ';').manipulators(launchApp),

  layer('`', 'mouse-mode').condition(ifMoonlander).manipulators(mouseCursor),

  appleKeyboard,
  appModifiers,
  appOverrides,
]

writeToProfile('Default', rules, {
  'basic.simultaneous_threshold_milliseconds': 40,
  'duo_layer.threshold_milliseconds': 40,
  'simlayer.threshold_milliseconds': 120,
})
