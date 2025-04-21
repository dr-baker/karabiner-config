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
//      * ⏎: Left click
//      * n: Clear notifications
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
  withModifier,
  writeToProfile,
} from 'karabiner.ts'

import {
  historyNavi,
  raycastExt,
  switcher,
  tabNavi,
  tapModifiers,
  toClearNotifications,
  toResizeWindow,
  toSystemSetting,
} from './utils.ts'

let THRESHOLD = 50;

function main() {
  writeToProfile(
    'general',
    [
      rule_leaderKey(), // leader key: a -> app, c -> clipboard, d -> desktop, etc.

      layer_symbol(), // s+;: symbols (!@#$%^&*()_+)
      layer_digitAndDelete(), // d+;: numpad, delete keys
      layer_system(), // `+system: move cursor around, clear notifications, sleep system

      // Browsers
      app_chrome(), // Chrome: history/tab nav, refresh, dev tools
      app_safari(), // Safari: history/tab nav, sidebar, inspector

      // IDEs & Editors
      app_jetBrainsIDE(), // JetBrains: navigation, refactoring
      app_zed(), // Zed: navigation, commands
      app_vsCode(), // VS Code: navigation, commands
      app_cursor(), // Cursor: navigation, commands

      // Communication
      app_slack(), // Slack: navigation, commands
      app_warp(), // Warp: navigation, commands
      app_spark(), // Spark: navigation, commands
      app_zoom(), // Zoom: audio/video controls, chat
      app_chatGPT(), // ChatGPT: window management

      // System
      // app_raycast(), // Raycast: window management, navigation
      app_homerow(), // Homerow: click/scroll gestures

      // Hardware
      map_hyper(),
    ],
    {
      'basic.simultaneous_threshold_milliseconds': 50,
      'duo_layer.threshold_milliseconds': 50,
      'duo_layer.notification': true,
    },
  )
}

function rule_leaderKey() {
  let _var = 'leader'
  let escape = [toUnsetVar(_var), toRemoveNotificationMessage(_var)]

  let mappings = {
    a: {
      name: 'App',
      mapping: {
        a: 'ChatGPT', // AI
        b: 'Arc', // Browser
        c: 'Cursor', // Code
        e: 'Mail', // Email
        // f: 'Finder',
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

  let keys = Object.keys(mappings) as Array<keyof typeof mappings>
  let hint = keys.map((x) => `${x}_${mappings[x].name}`).join(' ')

  return rule('Leader Key').manipulators([
    // 0: Inactive -> Leader (1)
    withCondition(ifVar(_var, 0))([
      mapSimultaneous(['l', ';'], undefined, THRESHOLD)
        .toVar(_var, 1)
        .toNotificationMessage(_var, hint),
    ]),

    // 0.unless: Leader or NestedLeader -> Inactive (0)
    withCondition(ifVar(_var, 0).unless())([
      withMapper(['⎋', '⇪'])((x) => map(x).to(escape)),
    ]),

    // 1: Leader -> NestedLeader (🔤)
    withCondition(ifVar(_var, 1))(
      keys.map((k) => {
        let hint = Object.entries(mappings[k].mapping)
          .map(([k, v]) => `${k}_${Array.isArray(v) ? v[1] : v}`)
          .join(' ')
        return map(k).toVar(_var, k).toNotificationMessage(_var, hint)
      }),
    ),

    // 🔤: NestedLeader
    ...keys.map((nestedLeaderKey) => {
      let { mapping, action } = mappings[nestedLeaderKey]
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
    // digits keypad_{i}
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

    n: toClearNotifications,

    '␣': toSleepSystem(),

    j: toKey('⇥', '⌘'),
    k: toKey('⇥', '⌘⇧'),
  })
}

function app_chrome() {
  return rule('Chrome', ifApp('^com.google.Chrome$')).manipulators([
    ...historyNavi(),
    ...tabNavi(),
    ...switcher(),

    ...tapModifiers({
      '‹⌥': toKey('r', '⌘'), // refreshThePage

      '›⌘': toKey('i', '⌘⌥'), // developerTools
      '›⌥': toKey('a', '⌘⇧'), // searchTabs
    }),

    map(1, 'Meh').to(toResizeWindow('Google Chrome')),
  ])
}

function app_safari() {
  return rule('Safari', ifApp('^com.apple.Safari$')).manipulators([
    ...historyNavi(),
    ...tabNavi(),
    ...switcher(),

    ...tapModifiers({
      '‹⌘': toKey('l', '⌘⇧'), // showHideSideBar
      '‹⌥': toKey('r', '⌘'), // reloadPage

      '›⌘': toKey('i', '⌘⌥'), // showWebInspector
    }),

    map(1, 'Meh').to(toResizeWindow('Safari')),
  ])
}

function app_jetBrainsIDE() {
  return rule('JetBrains IDE', ifApp('^com.jetbrains.[\\w-]+$')).manipulators([
    ...historyNavi(),
    ...tabNavi(),
    ...switcher(),

    ...tapModifiers({
      '‹⌘': toKey('⎋', '⌘⇧'), // hideAllToolWindows
      '‹⌥': toKey('r', '⌥⇧'), // Run
      '‹⌃': toKey('r', '⌥⌃'), // Run...

      '›⌘': toKey(4, '⌥'), // toolWindows_terminal
      '›⌥': toKey('a', '⌘⇧'), // findAction
      '›⌃': toKey('e', '⌘'), // recentFiles
    }),

    map(1, 'Meh').to(toResizeWindow('WebStorm')),
  ])
}

function app_zed() {
  return rule('Zed', ifApp('^dev.zed.Zed$')).manipulators([
    ...historyNavi(),
    ...tabNavi(),
    ...switcher(),

    ...tapModifiers({
      '‹⌘': toKey('y', '⌘⌥'), // closeAllDocks
      '‹⌥': toKey('t', '⌥'), // task::Rerun
      '‹⌃': toKey('t', '⌥⇧'), // task::Spawn

      '›⌘': toKey('`', '⌃'), // terminal
      '›⌥': toKey('a', '⌘⇧'), // command
      '›⌃': toKey('p', '⌘'), // fileFinder
    }),

    map(1, 'Meh').to(toResizeWindow('Zed')),
  ])
}

function app_vsCode() {
  return rule('VSCode', ifApp('^com.microsoft.VSCode$')).manipulators([
    ...tabNavi(),
    ...switcher(),
    map('h', '⌃').to('-', '⌃'),
    map('l', '⌃').to('-', '⌃⇧'),

    ...tapModifiers({
      '‹⌘': toKey('⎋', '⌘'), // Tobble Sidebar visibility
      '‹⌥': toKey('r', '⌥⇧'), // Run

      '›⌘': toKey('`', '⌃'), // terminal
      '›⌥': toKey('p', '⌘⇧'), // Show Command Palette
      '›⌃': toKey('p', '⌘'), // Quick Open, Go to File...
    }),

    map(1, 'Meh').to(toResizeWindow('Code')),
  ])
}

function app_cursor() {
  return rule('Cursor', ifApp('^com.todesktop.230313mzl4w4u92$')).manipulators([
    ...tabNavi(),
    ...switcher(),
    map('h', '⌃').to('-', '⌃'),
    map('l', '⌃').to('-', '⌃⇧'),

    ...tapModifiers({
      '‹⌘': toKey('⎋', '⌘'), // Tobble Sidebar visibility
      '‹⌥': toKey('r', '⌥⇧'), // Run

      '›⌘': toKey('`', '⌃'), // terminal
      '›⌥': toKey('p', '⌘⇧'), // Show Command Palette
      '›⌃': toKey('p', '⌘'), // Quick Open, Go to File...
    }),
  ])
}

function app_warp() {
  return rule('Warp', ifApp('^dev.warp.Warp')).manipulators([
    ...tabNavi(),
    map(1, 'Meh').to(toResizeWindow('Warp')),
  ])
}

function app_slack() {
  return rule('Slack', ifApp('^com.tinyspeck.slackmacgap$')).manipulators([
    ...historyNavi(),

    ...tapModifiers({
      '‹⌘': toKey('d', '⌘⇧'), // showHideSideBar
      '‹⌥': toKey('f6'), // moveFocusToTheNextSection

      '›⌘': toKey('.', '⌘'), // hideRightBar
      '›⌥': toKey('k', '⌘'), // open
    }),

    map(1, 'Meh').to(
      // After the 1/4 width, leave some space for opening thread in a new window
      // before the last 1/4 width
      toResizeWindow('Slack', { x: 1263, y: 25 }, { w: 1760, h: 1415 }),
    ),
  ])
}

function app_spark() {
  return rule('Spark', ifApp('^com.readdle.SparkDesktop')).manipulators([
    ...tapModifiers({
      '‹⌘': toKey('/'), // openSidebar
      '‹⌥': toKey('r', '⌘'), // fetch

      '›⌘': toKey('/', '⌘'), // changeLayout
      '›⌥': toKey('k', '⌘'), // actions
    }),

    map(1, 'Meh').to(
      toResizeWindow('Spark Desktop', undefined, { w: 1644, h: 1220 }),
    ),
  ])
}

function app_zoom() {
  return rule('Zoom', ifApp('^us.zoom.xos$')).manipulators(
    tapModifiers({
      '‹⌘': toKey('a', '⌘⇧'), // muteUnmuteMyAudio
      '‹⌥': toKey('s', '⌘⇧'), // startStopScreenSharing

      '›⌘': toKey('v', '⌘⇧'), // startStopVideo
      '›⌥': toKey('h', '⌘⇧'), // showHideChatPanel
    }),
  )
}

// function app_raycast() {
//   return rule('Raycast').manipulators([
//     map('␣', '⌥').to(raycastExt('evan-liu/quick-open/index')),

//     withModifier('Hyper')({
//       '↑': raycastWin('previous-display'),
//       '↓': raycastWin('next-display'),
//       '←': raycastWin('previous-desktop'),
//       '→': raycastWin('next-desktop'),
//     }),
//     withModifier('Hyper')({
//       1: raycastWin('first-third'),
//       2: raycastWin('center-third'),
//       3: raycastWin('last-third'),
//       4: raycastWin('first-two-thirds'),
//       5: raycastWin('last-two-thirds'),
//       9: raycastWin('left-half'),
//       0: raycastWin('right-half'),
//     }),
//     withModifier('Meh')({
//       1: raycastWin('first-fourth'),
//       2: raycastWin('second-fourth'),
//       3: raycastWin('third-fourth'),
//       4: raycastWin('last-fourth'),
//       5: raycastWin('center'),
//       6: raycastWin('center-half'),
//       7: raycastWin('center-two-thirds'),
//       8: raycastWin('maximize'),
//     }),
//   ])
// }

function app_homerow() {
  return rule('Homerow').manipulators([
    mapSimultaneous(['f', 'j']).to('␣', 'Hyper'), // Click
    mapSimultaneous(['f', 'k']).to('⏎', 'Hyper'), // Scroll
  ])
}

function app_chatGPT() {
  return rule('ChatGPT', ifApp('^com.openai.chat$')).manipulators([
    map(1, 'Meh').to(toResizeWindow('ChatGPT')),
  ])
}

function map_hyper() {
  return rule('Map Hyper/Meh').manipulators([

    map('›⌥', '›⇧').toHyper(),
    map('›⌘', '›⇧').toMeh(),
  ])
}

main()
