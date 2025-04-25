// Core configuration file for Karabiner-Elements using karabiner.ts
// This file defines keyboard mappings, layers, and application-specific rules

// MAIN FUNCTIONALITY SUMMARY:
// ==========================
// 
// 1. LEADER KEY (l + ;)
//    - Press 'l' + ';' simultaneously to activate leader mode
//    - Available modes:
//      * a: App launcher (e.g., a -> ChatGPT, c -> Calendar, d -> Dictionary)
//      * e: Emoji picker (e.g., c -> 📅, h -> 💯, j -> 😂)
//      * g: Gitmoji picker (e.g., b -> 🐛, d -> 📝, f -> 🚩)
//      * l: Link opener (custom links from links.json)
//      * r: Raycast commands (e.g., c -> Calendar, d -> Dictionary)
//      * s: System settings (e.g., a -> Appearance, d -> Displays)
//
// 2. LAYERS
//    - Vim navigation (f + ;):
//      * h,j,k,l: Arrow keys
//      * ;: Shift right, d: Command left, s: Control left, a: Option left
//    - Symbols (s + ;):
//      * y,u,i,o,p: ? } ] ) %
//      * h,j,k,l,;: ^ { [ ( $
//      * n,m,,,.: & ! @ #
//    - Number pad (d + ;):
//      * n,m,,,.: 0,1,2,3
//      * j,k,l: 4,5,6
//      * u,i,o: 7,8,9
//      * p,;,/,]: +,-,/,*
//    - Snippets (z + x):
//      * 2,3,4,5: ⌫,⌦,⇥,⎋
//      * 6,7,8,9: ⌘,⌥,⌃,⇧
//    - System ( ` ):
//      * 1,2,3,4: Window positions
//      * ␣: Sleep system
//
// 3. DUO MODIFIERS (Simultaneous key presses)
//    - Single modifiers:
//      * fd/jk: Command (⌘)
//      * fs/jl: Control (⌃)
//      * fa/j;: Option (⌥)
//      * ds/kl: Shift (⇧)
//    - Dual modifiers:
//      * gd/hk: Command + Shift
//      * gs/hl: Control + Shift
//      * ga/h;: Option + Shift
//      * vc/m,: Command + Option
//      * vx/m.: Command + Control
//      * cx/,.: Option + Control
//    - Triple modifier:
//      * vz/m/: Command + Option + Control
//
// 4. APPLICATION-SPECIFIC RULES
//    - Browsers (Chrome, Safari):
//      * ⌘[ / ⌘] -> History back/forward
//      * ⌘⇧[ / ⌘⇧] -> Previous/next tab
//      * ⌘w -> Close tab
//      * ⌘` / ⌘⇧` -> Next/previous window
//      * Chrome: ⌥r -> Refresh, ⌘i -> DevTools, ⌥t -> Search tabs
//      * Safari: ⌘s -> Toggle sidebar, ⌥r -> Reload, ⌘i -> Web Inspector
//    - IDEs (JetBrains, Zed, VS Code):
//      * ⌘[ / ⌘] -> Navigate back/forward
//      * ⌘⇧[ / ⌘⇧] -> Previous/next tab
//      * ⌘` / ⌘⇧` -> Next/previous window
//      * JetBrains: ⌘h -> Hide tools, ⌥r -> Run, ⌘t -> Terminal, ⌥a -> Actions
//      * Zed: ⌘d -> Close docks, ⌥t -> Tasks, ⌘t -> Terminal, ⌥c -> Commands
//      * VS Code: ⌘b -> Toggle sidebar, ⌥r -> Run, ⌘t -> Terminal, ⌥c -> Commands
//    - Communication (Slack, Zoom):
//      * Slack: ⌘s -> Toggle sidebar, ⌥f -> Section focus, ⌘h -> Hide right bar
//      * Zoom: ⌘a -> Toggle audio, ⌥s -> Screen share, ⌘v -> Toggle video, ⌥c -> Chat panel
//    - Raycast:
//      * ⌥Space -> Quick open
//      * THRESHOLD + ←↑→↓ -> Window management
//      * THRESHOLD + ←→ -> Switch display/desktop
//      * Hyper/Meh + 1-9 -> Window sizing presets
//    - Homerow:
//      * f+j -> Left mouse click
//      * f+k -> Mouse scroll
//
// 5. KEYBOARD-SPECIFIC RULES
//    - Apple keyboard:
//      * Caps Lock + ⌘⌃ -> Escape
//      * Caps Lock + ⇧ -> Caps Lock
//      * Right ⌥⇧ -> Hyper
//      * Right ⌘⇧ -> Meh
//    - Moonlander:
//      * Escape + ⇧/⇪ -> Caps Lock
//      * Left Control -> Input source switch

// Import core functionality from karabiner.ts library
// These functions provide the building blocks for creating keyboard mappings

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
} from './utils.ts'

let THRESHOLD = 50;

type ControlMapping = {
  from: readonly [FromKeyParam, ModifierParam],
  to: readonly [ToKeyParam, ModifierParam]
}

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
    'general',
    [
      rule_leaderKey(),
      rule('System Controls').manipulators(applySystemControls()),
      layer_symbol(), // s+;: symbols (!@#$%^&*()_+)
      layer_digitAndDelete(),// d+;: numpad, delete keys
      layer_system(),// `: window positions, mouse, sleep, tab switch
      app_chrome(),
      app_cursor(),
      app_slack(),
      map_hyper(),
      caps_hyper(),
      app_shortcuts(),
      snippets(),
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
    mapping: require('./links.json') as { [key: string]: string[] },
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
      d: 'Displays',
      k: 'Keyboard',
      o: 'Dock',
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
  let hint = keys.map((x) => `${x}_${leader_mappings[x].name}`).join(' ')

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
          .map(([k, v]) => `${k}_${Array.isArray(v) ? v[1] : v}`)
          .join(' ')
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
    1: toMouseCursorPosition({ x: '25%', y: '50%', screen: 0 }),
    2: toMouseCursorPosition({ x: '50%', y: '50%', screen: 0 }),
    3: toMouseCursorPosition({ x: '75%', y: '50%', screen: 0 }),
    4: toMouseCursorPosition({ x: '99%', y: 20, screen: 0 }),
    5: toMouseCursorPosition({ x: '50%', y: '50%', screen: 1 }),
    '⏎': toPointingButton('button1'),
    '␣': toSleepSystem(),
    j: toKey('⇥', '⌘'),
    k: toKey('⇥', '⌘⇧'),
  })
}

function app_chrome() {
  return rule('Arc', ifApp('^company.thebrowser.Browser$')).manipulators([
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
  return rule('Cursor', ifApp('^com.todesktop.230313mzl4w4u92$')).manipulators([
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
  return rule('Slack', ifApp('^com.tinyspeck.slackmacgap$')).manipulators([
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

main()