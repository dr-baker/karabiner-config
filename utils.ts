import {
  type KeyAlias,
  type LetterKeyCode,
  map,
  mapSimultaneous,
  type ModifierKeyAlias,
  modifierKeyAliases,
  type MultiModifierAlias,
  multiModifierAliases,
  type SideModifierAlias,
  to$,
  type ToEvent,
  toRemoveNotificationMessage,
} from 'karabiner.ts'

/** Back/Forward history in most apps. */
export function historyNavi() {
  return [
    map('h', '⌃').to('[', '⌘'), //
    map('l', '⌃').to(']', '⌘'),
  ]
}

/** Pre/Next tab in most apps. */
export function tabNavi() {
  return [
    map('h', '⌥').to('[', '⌘⇧'), //
    map('l', '⌥').to(']', '⌘⇧'),
  ]
}

/** Pre/Next switcher in most apps. */
export function switcher() {
  return [
    map('h', '⌘⌥⌃').to('⇥', '⌃⇧'), //
    map('l', '⌘⌥⌃').to('⇥', '⌃'),
  ]
}

/**
 * Map when tap a modifier key; keep as modifier when hold.
 *
 * - ‹⌘ Show/Hide UI (e.g. left sidebars, or all UI)
 * - ‹⌥ Run current task (re-run)
 * - ‹⌃ Run list
 *
 * - ›⌘ Show/Hide UI (e.g. right sidebars, or terminal)
 * - ›⌥ Command Palette (e.g. ⌘K, ⌘P)
 * - ›⌃ History (e.g. recent files)
 */
export function tapModifiers(
  v: Partial<Record<SideModifierAlias | 'fn', ToEvent>>,
) {
  return Object.entries(v).map(([k, to]) => {
    let key = k as SideModifierAlias | 'fn'
    return map(key).to(key).toIfAlone(to)
  })
}

export function raycastExt(name: string) {
  return to$(`open raycast://extensions/${name}`)
}

export function raycastWin(name: string) {
  return to$(`open -g raycast://extensions/raycast/window-management/${name}`)
}

export function toResizeWindow(
  app: string,
  position = { x: 0, y: 220 }, // First window, below widgets
  size = { w: 1262, h: 1220 }, // First 1/4 width, screen height - widgets height
) {
  return to$(`osascript -e '\
set windowPosition to {${position.x}, ${position.y}}
set windowSize to {${size.w}, ${size.h}}

tell application "System Events"
  tell process "${app}"
    set frontWindow to first window
    set position of frontWindow to windowPosition
    set size of frontWindow to windowSize
  end tell
end tell'`)
}

export function toSystemSetting(pane: string) {
  let path = `/System/Library/PreferencePanes/${pane}.prefPane`
  return to$(`open -b com.apple.systempreferences ${path}`)
}
