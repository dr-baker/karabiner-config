import {
  ifApp,
  map,
  rule,
  toKey,
  withModifier,
} from 'karabiner.ts'

import {
  historyNavi,
  tabNavi,
  switcher,
  tapModifiers,
  toResizeWindow,
  raycastWin,
  raycastExt,
} from './utils.ts'

// App control mappings
export let app_controls = {
  leftSidebar: '‹⌥',
  rightSidebar: '›⌥',
  swapTab: '‹⌃',
  search: '›⌘',
}

export function app_safari() {
  return rule('Safari', ifApp('^com.apple.Safari$')).manipulators([
    ...historyNavi(),
    ...tabNavi(),
    ...switcher(),

    ...tapModifiers({
      [app_controls.leftSidebar]: toKey('l', '⌘⇧'), // showHideSideBar
      [app_controls.rightSidebar]: toKey('i', '⌘⌥'), // showWebInspector
      [app_controls.search]: toKey('l', '⌘'), // Address Bar
    }),

    map(1, 'Meh').to(toResizeWindow('Safari')),
  ])
}

export function app_zed() {
  return rule('Zed', ifApp('^dev.zed.Zed$')).manipulators([
    ...historyNavi(),
    ...tabNavi(),
    ...switcher(),

    ...tapModifiers({
      [app_controls.leftSidebar]: toKey('b', '⌘⌥'), // Toggle Sidebar visibility
      [app_controls.rightSidebar]: toKey('b', '⌘'), // Toggle Sidebar visibility
      [app_controls.swapTab]: toKey('f5', '⌃'), // Run
      [app_controls.search]: toKey('p', '⌘'), // // Quick Open, Go to File...

      // '›⌘': toKey('j', '⌘'), // terminal
      // '›⌥': toKey('p', '⌘⇧'), // Show Command Palette
    }),

    map(1, 'Meh').to(toResizeWindow('Zed')),
  ])
}

export function app_vsCode() {
  return rule('VSCode', ifApp('^com.microsoft.VSCode$')).manipulators([
    ...tabNavi(),
    ...switcher(),
    map('h', '⌃').to('-', '⌃'),
    map('l', '⌃').to('-', '⌃⇧'),

    ...tapModifiers({
      [app_controls.leftSidebar]: toKey('b', '⌘⌥'), // Toggle Sidebar visibility
      [app_controls.rightSidebar]: toKey('b', '⌘'), // Toggle Sidebar visibility
      [app_controls.swapTab]: toKey('f5', '⌃'), // Run
      [app_controls.search]: toKey('p', '⌘'), // // Quick Open, Go to File...

      // '›⌘': toKey('j', '⌘'), // terminal
      // '›⌥': toKey('p', '⌘⇧'), // Show Command Palette
    }),

    map(1, 'Meh').to(toResizeWindow('Code')),
  ])
} 

function app_raycast() {
  return rule('Raycast').manipulators([
    map('␣', '⌥').to(raycastExt('evan-liu/quick-open/index')),

    withModifier('Hyper')({
      '↑': raycastWin('previous-display'),
      '↓': raycastWin('next-display'),
      '←': raycastWin('previous-desktop'),
      '→': raycastWin('next-desktop'),
    }),
    withModifier('Hyper')({
      1: raycastWin('first-third'),
      2: raycastWin('center-third'),
      3: raycastWin('last-third'),
      4: raycastWin('first-two-thirds'),
      5: raycastWin('last-two-thirds'),
      9: raycastWin('left-half'),
      0: raycastWin('right-half'),
    }),
    withModifier('Meh')({
      1: raycastWin('first-fourth'),
      2: raycastWin('second-fourth'),
      3: raycastWin('third-fourth'),
      4: raycastWin('last-fourth'),
      5: raycastWin('center'),
      6: raycastWin('center-half'),
      7: raycastWin('center-two-thirds'),
      8: raycastWin('maximize'),
    }),
  ])
}