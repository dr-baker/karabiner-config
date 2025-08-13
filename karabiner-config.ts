import {
  duoLayer,
  ifApp,
  ifDevice,
  ifVar,
  layer,
  map,
  mapDoubleTap,
  mapSimultaneous,
  rule,
  to$,
  toApp,
  type ToEvent,
  toKey,
  toMouseCursorPosition,
  toPaste,
  toPointingButton,
  toRemoveNotificationMessage,
  toSleepSystem,
  toUnsetVar,
  withCondition,
  withMapper,
  hyperLayer,
  withModifier,
  writeToProfile,
  modifierLayer,
  type FromKeyParam,
  type ModifierParam,
  type ToKeyParam,
} from 'karabiner.ts'

// Unused app configurations - uncomment to use
// import {
//   app_safari,
//   app_zed,
//   app_vsCode,
//   app_controls as unused_controls
// } from './unused_config'

import {
  raycastExt,
  raycastWin,
  tapModifiers,
  toResizeWindow,
  toSystemSetting,
  swapModifiersForKeys,
} from './utils.ts'

// External data imports
import links from './links.json' with { type: 'json' }

// Timing threshold for duo layers and simultaneous keys
let THRESHOLD = 50;

// Common navigation/editing keys used across rules
const NAVIGATION_KEYS = [
  'delete_or_backspace',
  'up_arrow',
  'down_arrow',
  'left_arrow',
  'right_arrow',
] as const

// Centralized app bundle identifiers
const APP_IDS = {
  arc: '^company.thebrowser.Browser$',
  cursor: '^com.todesktop.230313mzl4w4u92$',
  slack: '^com.tinyspeck.slackmacgap$',
} as const

type ControlMapping = {
  from: readonly [FromKeyParam, ModifierParam],
  to: readonly [ToKeyParam, ModifierParam]
}

// TODO rcmd rctrl history navigation
// rcmd arrows maps to something unique that is ultimately change space
// lcmd arrows maps to lctrl, then fix lctrl
// Mentality: binding has meaning-- "to" changes to meet that according to apps
/*

const system_controls_new = {
  // System level
  next_space: {
    from: ['right_arrow', '›⌘'], to: ['⇥', '⌘']
  },
  prev_space: {
    from: ['left_arrow', '›⌘'], to: ['⇥', '⌘⇧']
  },

  // App level -- default to the binding in "to" unless rebound in app rules
  back_history: {
    from: ['h', '⌃'], to: ['[', '⌘']
  },
  forward_history: {
    from: ['l', '⌃'], to: [']', '⌘']
  },
};
*/

const system_controls = {
  // History navigation 
  back_history: {
    from: ['h', '⌃'], to: ['[', '⌘']
  },
  forward_history: {
    from: ['l', '⌃'], to: [']', '⌘']
  },
  // Tab navigation
  prev_tab: {
    from: ['h', '⌃'], to: ['[', '⌘⇧']
  },
  next_tab: {
    from: ['l', '⌃'], to: [']', '⌘⇧']
  },
  // Alt-tab switcher
  prev_file: {
    from: ['h', '⌘⌥⌃'], to: ['⇥', '⌃⇧']
  },
  next_file: {
    from: ['l', '⌘⌥⌃'], to: ['⇥', '⌃']
  }
} as const satisfies Record<string, ControlMapping>;

function applySystemControls() {
  return Object.entries(system_controls).map(([_, mapping]) => 
    map(mapping.from[0], mapping.from[1]).to(mapping.to[0], mapping.to[1])
  );
}

function main() {
  writeToProfile(
    'General',
    [
      rule_leaderKey(),
      rule('System Controls').manipulators(applySystemControls()),
      layer_symbol(), // s+;: symbols (!@#$%^&*()_+)
      layer_digitAndDelete(),// d+;: numpad, delete keys
      layer_system(),// `: window positions, mouse, sleep, tab switch
      app_arc(),
      app_cursor(),
      app_slack(),
      map_hyper(),
      caps_hyper(),
      app_shortcuts(),
      snippets(),
      easyWordBehavior(),
      shiftBackspaceToDeleteRule(),
    ],
    {
      'basic.simultaneous_threshold_milliseconds': 50,
      'duo_layer.threshold_milliseconds': 50,
      'duo_layer.notification': true,
    },
  )

  // Windows profile: map Command to Control/Command and Caps Lock to A
  writeToProfile(
    'Windows',
    [
      //windows_cmd_rule(),
      windows_caps_to_a_rule(),
      shiftBackspaceToDeleteRule(),
    ],
    {
      'basic.simultaneous_threshold_milliseconds': 50,
      'duo_layer.threshold_milliseconds': 50,
      'duo_layer.notification': true,
    },
  )
}

let leader_mappings = {
  a: {
    name: 'App',
    mapping: {
      a: 'ChatGPT', // AI
      b: 'Arc', // Browser
      c: 'Cursor', // Code
      e: 'Mail', // Email
      // f: 'Finder',
      p: 'Passwords',
      s: 'Slack',
      // t: 'Warp', // Terminal
      m: 'Messages',
      n: 'Notes',
      u: 'Spotify', // mUsic
      ';': 'System Settings',
    },
    action: toApp,
  },
  e: {
    name: 'Emoji',
    mapping: {
      c: '📅', // Calendar
      h: '💯', // Hundred
      j: '😂', // Joy
      p: '👍', // Plus_one +1
      s: '😅', // Sweat_smile
      t: '🧵', // Thread
    },
    action: toPaste,
  },
  l: {
    name: 'Link',
    mapping: links as unknown as { [key: string]: string | string[] },
    action: (x) => to$(`open ${x}`),
  },
  r: {
    name: 'Raycast',
    mapping: {
      c: ['raycast/calendar/my-schedule', 'Calendar'],
      d: ['raycast/dictionary/define-word', 'Dictionary'],
      e: ['raycast/emoji-symbols/search-emoji-symbols', 'Emoji'],
      g: ['ricoberger/gitmoji/gitmoji', 'Gitmoji'],
      s: ['raycast/snippets/search-snippets', 'Snippets'],
      v: ['raycast/clipboard-history/clipboard-history', 'Clipboard'],
    },
    action: raycastExt,
  },
  s: {
    name: 'SystemSetting',
    mapping: {
      a: 'Appearance',
      b: 'Bluetooth',
      d: 'Displays',
      g: 'Software Update', // General
      k: 'Keyboard',
      m: 'Mouse',
      n: 'Network', 
      p: 'Security', // Privacy and Security
    },
    action: toSystemSetting,
  },
} satisfies {
  [key: string]: {
    name: string
    mapping: { [key: string]: string | string[] }
    action: (v: string) => ToEvent | ToEvent[]
  }
}

// New plan: sidebar toggles with CMD+S and CMD+SHIFT+S
// tap modifiers used for bespoke functions without an established shortcut
// in my headcannon. rcmd, ropt for history nav. 
// ›⌃ ›⌥ ›⌘ ‹⌃ ‹⌥ ‹⌘
let app_controls = {
  leftSidebar: '‹⌥',
  rightSidebar: '›⌥',
  swapTab: '‹⌃',
  search: '›⌘',
  // reloadPage: '›⌥',
}

function rule_leaderKey() {
  let _var = 'leader'
  let escape = [toUnsetVar(_var), toRemoveNotificationMessage(_var)]

  let keys = Object.keys(leader_mappings) as Array<keyof typeof leader_mappings>
  let hint = keys.map((x) => `[\t${x}\t]\t${leader_mappings[x].name}`).join('\n')

  return rule('Leader Key').manipulators([
    // if var not set, set 1 on l+; (AKA, activate)
    withCondition(ifVar(_var, 0))([
      mapSimultaneous(['l', ';'], undefined, THRESHOLD)
        .toVar(_var, 1)
        .toNotificationMessage(_var, hint),
    ]),

    // if var is set, map escape/caps to escape
    withCondition(ifVar(_var, 0).unless())([
      withMapper(['⎋', '⇪'])((x) => map(x).to(escape)),
    ]),

    withCondition(ifVar(_var, 1))(
      keys.map((k) => {
        let hint = Object.entries(leader_mappings[k].mapping)
          .map(([k, v]) => `[\t${k}\t]\t${Array.isArray(v) ? v[1] : v}`)
          .join('\n')
        return map(k).toVar(_var, k).toNotificationMessage(_var, hint)
      }),
    ),

    ...keys.map((nestedLeaderKey) => {
      let { mapping, action } = leader_mappings[nestedLeaderKey]
      let actionKeys = Object.keys(mapping) as Array<keyof typeof mapping>
      return withCondition(ifVar(_var, nestedLeaderKey))(
        actionKeys.map((x) => {
          let v = Array.isArray(mapping[x]) ? mapping[x][0] : mapping[x]
          return map(x).to(action(v)).to(escape)
        }),
      )
    }),
  ])
}

function layer_symbol() {
  let hint = `\
&   !  @ #    ^   {  [   (  $      ?  }  ]   )  %      _   +      ⌫
N  M  ,   .    H  J  K  L  ;      Y  U  I  O  P       ␣  ⏎      '`

  let toSymbol = {
    '!': toKey(1, '⇧'),
    '@': toKey(2, '⇧'),
    '#': toKey(3, '⇧'),
    $: toKey(4, '⇧'),
    '%': toKey(5, '⇧'),
    '^': toKey(6, '⇧'),
    '&': toKey(7, '⇧'),
    '*': toKey(8, '⇧'),
    '(': toKey(9, '⇧'),
    ')': toKey(0, '⇧'),

    '[': toKey('['),
    ']': toKey(']'),
    '{': toKey('[', '⇧'),
    '}': toKey(']', '⇧'),

    '-': toKey('-'),
    '=': toKey('='),
    _: toKey('-', '⇧'),
    '+': toKey('=', '⇧'),

    ';': toKey(';'),
    '/': toKey('/'),
    ':': toKey(';', '⇧'),
    '?': toKey('/', '⇧'),

    ',': toKey(','),
    '.': toKey('.'),
    '<': toKey(',', '⇧'),
    '>': toKey('.', '⇧'),
  }

  let layer = duoLayer('s', ';').threshold(THRESHOLD).notification(hint)
  return layer.manipulators([
    withMapper({
      // ! @ # $ % ^ & * ( )    _ +
      // 1 2 3 4 5 6 7 8 9 0    - =

      y: '?',
      u: '}',
      i: ']',
      o: ')', // 0
      p: '%', // 5

      h: '^', // 6
      j: '{',
      k: '[',
      l: '(', // 9
      ';': '$', // 4

      n: '&', // 7
      m: '!', // 1
      ',': '@', // 2
      '.': '#', // 3

      ']': '*', // 8

      '␣': '_',
      '⏎': '+',
    } as const)((k, v) => map(k).to(toSymbol[v])),

    { "'": toKey('⌫') },
  ])
}

function layer_digitAndDelete() {
  let hint = `\
0    1  2  3    4  5  6    7  8  9    +  -  /  *    .    ⌫_⌥_⌘  ⌦
N   M  ,   .     J  K  L    U  I  O    P  ;   /  ]    [      '   H   Y    \\`
  let layer = duoLayer('d', ';').threshold(THRESHOLD).notification(hint)
  return layer.manipulators([
    // digits keypad_{i}c
    withMapper([
      'n', //             // 0
      ...['m', ',', '.'], // 1 2 3
      ...['j', 'k', 'l'], // 4 5 6
      ...['u', 'i', 'o'], // 7 8 9
    ] as const)((k, i) => map(k).to(`keypad_${i as 0}`)),

    // + - / * .
    {
      p: toKey('=', '⇧'), // +
      ';': toKey('-'), // // -
      // / stay           // /
      ']': toKey(8, '⇧'), // *

      '[': toKey('keypad_period'),
    },

    // delete ⌫ ⌦
    {
      '\\': toKey('⌦'),

      "'": toKey('⌫'),
      h: toKey('⌫', '⌥'),
      y: toKey('⌫', '⌘'),
    },

    // F1 - F9
    withMapper([1, 2, 3, 4, 5, 6, 7, 8, 9])((k) => map(k).to(`f${k}`)),
  ])
}


function layer_system() {
  return layer('`', 'system').manipulators({
    1: toMouseCursorPosition({ x: '99%', y: 20, screen: 0 }),
    '⏎': toPointingButton('button1'),
    '␣': toSleepSystem(),
    j: toKey('⇥', '⌘'),
    k: toKey('⇥', '⌘⇧'),
  })
}

function app_arc() {
  return rule('Arc', ifApp(APP_IDS.arc)).manipulators([
    ...tapModifiers({
      [app_controls.swapTab]: toKey('tab', '⌃'), // refreshThePage
      [app_controls.leftSidebar]: toKey('s', '⌘'), // leftSidebar
      [app_controls.rightSidebar]: toKey('i', '⌘⌥'), // dev tools
      [app_controls.search]: toKey('l', '⌘'), // Address Bar
    }),
    map(1, 'Meh').to(toResizeWindow('Google Chrome')),
  ])
}

function app_cursor() {
  return rule('Cursor', ifApp(APP_IDS.cursor)).manipulators([
    map('h', '⌃').to('-', '⌃'),
    map('l', '⌃').to('-', '⌃⇧'),
    ...tapModifiers({
      [app_controls.leftSidebar]: toKey('b', '⌘⌥'), // Toggle Sidebar visibility
      [app_controls.rightSidebar]: toKey('b', '⌘'), // Toggle Sidebar visibility
      [app_controls.swapTab]: toKey('f5', '⌃'), // Run
      [app_controls.search]: toKey('p', '⌘'), // Quick Open, Go to File...
    }),
  ])
}

function app_slack() {
  return rule('Slack', ifApp(APP_IDS.slack)).manipulators([
    ...tapModifiers({
      [app_controls.leftSidebar]: toKey('d', '⌘⇧'), // showHideSideBar
      [app_controls.swapTab]: toKey('f6'), // moveFocusToTheNextSection
      [app_controls.rightSidebar]: toKey('.', '⌘'), // hideRightBar
    }),
    map(1, 'Meh').to(
      toResizeWindow('Slack', { x: 2294, y: 526 }, { w: 1146, h: 914 }),
    ),
  ])
}

function map_hyper() {
  return rule('Map Hyper/Meh').manipulators([
    map('›⌥', '›⇧').toHyper(),
    map('›⌘', '›⇧').toMeh(),
    map('.', '⌥').to('end'),
  ])
}

function caps_hyper() {
  return rule('Caps Lock → Hyper').manipulators([
      map('⇪').toHyper().toIfAlone('caps_lock'), 
      // TODO enabling caps lock is broken, see https://www.reddit.com/r/macapps/comments/1hqzary/caps_lock_if_alone_function_not_working_in/
      map('⇪', '⇧').to('caps_lock'),
    ])
}

function app_shortcuts() {
  const hint = Object.entries(leader_mappings.a.mapping)
    .map(([key, app]) => `[${key}] ${app}`)
    .join('\n');

  return hyperLayer('a')
    .description('Launch Apps')
    .leaderMode({ escape: ['spacebar', 'return_or_enter', 'escape'] })
    .notification(hint)
    .manipulators(
      Object.entries(leader_mappings.a.mapping).reduce((acc, [key, app]) => ({
        ...acc,
        [key]: toApp(app)
      }), {})
    )
}

function snippets() {
  return rule('Snippets').manipulators([
    map('␣', '⇧').to(toKey('-', '⇧')),
    map('-').toIfHeldDown( toPaste('--------.') ).toAfterKeyUp('-'), // testing
  ])
}


// // Swaps comand and option behavior on certain bindings so that command represents
// // single word navigation, and option represents beginning of line/end of line navigation.
function easyWordBehavior() {
  return rule('Windows: Swap Cmd/Option on keys').manipulators([
    ...swapModifiersForKeys(
      NAVIGATION_KEYS,
      'command',
      'option',
    ),
    ...swapModifiersForKeys(
      NAVIGATION_KEYS,
      ['command', 'shift'],
      ['option', 'shift'],
    )
  ])
}


// --------------------------------------------------------------------------------

function windows_cmd_rule() {
  return rule('Windows: Command to Control and Command').manipulators([
    map('left_command').to('left_control'),
    map('right_command').to('right_control'),
    map('left_control').to('left_command'),
    map('right_control').to('right_command'),
  ])
}

function windows_caps_to_a_rule() {
  return rule('Windows: Caps Lock to A').manipulators([
    map('caps_lock').toPointingButton('button3').toIfHeldDown('v', 'control'),
  ])
}

// --------------------------------------------------------------------------------

// Map Shift+Backspace to Forward Delete
function shiftBackspaceToDeleteRule() {
  return rule('Shift+Backspace to Forward Delete').manipulators([
    map('delete_or_backspace', 'shift').to('delete_forward')
  ])
}

main();