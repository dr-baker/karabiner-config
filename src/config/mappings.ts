/**
 * DECLARATIVE MAPPINGS
 * ===================
 *
 * Data-driven configuration for layers and rules.
 * Contains all the mapping data used by the rule implementations.
 */

import type { ToEvent } from 'karabiner.ts'
import { to$, toApp, toPaste } from 'karabiner.ts'
import { raycastExt, toSystemSetting } from '../utils'
import links from '../../links.json' with { type: 'json' }

// =============================================================================
// LEADER KEY MAPPINGS
// =============================================================================

/** Leader key mappings - Press l+; then these keys for quick actions */
export const LEADER_MAPPINGS = {
  a: {
    name: 'Applications',
    mapping: {
      a: 'ChatGPT',     // AI Assistant
      b: 'Arc',         // Web Browser
      c: 'Cursor',      // Code Editor
      e: 'Mail',        // Email Client
      p: 'Passwords',   // Password Manager
      s: 'Slack',       // Team Communication
      m: 'Messages',    // iMessage
      n: 'Notes',       // Apple Notes
      u: 'Spotify',     // Music Player
      ';': 'System Settings',
    },
    action: toApp,
  },
  e: {
    name: 'Emojis',
    mapping: {
      c: '📅',  // Calendar
      h: '💯',  // Hundred points
      j: '😂',  // Joy/Laughter
      p: '👍',  // Thumbs up
      s: '😅',  // Sweaty smile
      t: '🧵',  // Thread
    },
    action: toPaste,
  },
  l: {
    name: 'Links',
    mapping: links as unknown as { [key: string]: string | string[] },
    action: (url: string) => to$(`open ${url}`),
  },
  r: {
    name: 'Raycast Extensions',
    mapping: {
      c: ['raycast/calendar/my-schedule', 'Calendar Schedule'],
      d: ['raycast/dictionary/define-word', 'Dictionary Lookup'],
      e: ['raycast/emoji-symbols/search-emoji-symbols', 'Emoji Picker'],
      g: ['ricoberger/gitmoji/gitmoji', 'Git Commit Emojis'],
      s: ['raycast/snippets/search-snippets', 'Text Snippets'],
      v: ['raycast/clipboard-history/clipboard-history', 'Clipboard History'],
    },
    action: raycastExt,
  },
  s: {
    name: 'System Settings',
    mapping: {
      a: 'Appearance',
      b: 'Bluetooth',
      d: 'Displays',
      g: 'Software Update',
      k: 'Keyboard',
      m: 'Mouse',
      n: 'Network',
      p: 'Security & Privacy',
    },
    action: toSystemSetting,
  },
} satisfies Record<string, {
  name: string
  mapping: Record<string, string | string[]>
  action: (value: string) => ToEvent | ToEvent[]
}>

// =============================================================================
// APP CONTROL SHORTCUTS
// =============================================================================

/** App control shortcuts - Shared across app-specific rules */
export const APP_CONTROLS = {
  leftSidebar:  '‹⌥',  // Left sidebar toggle
  rightSidebar: '›⌥',  // Right sidebar toggle
  swapTab:      '‹⌃',  // Switch tab
  search:       '›⌘',  // Focus search/address bar
} as const

// =============================================================================
// SYSTEM CONTROL MAPPINGS
// =============================================================================

import type { ControlMapping } from './constants'

/** System-wide navigation controls (works in most apps) */
export const SYSTEM_CONTROLS = {
  // Browser history navigation
  back_history: {
    from: ['h', '⌃'], to: ['[', '⌘']  // Ctrl+H → Cmd+[ (Back)
  },
  forward_history: {
    from: ['l', '⌃'], to: [']', '⌘']  // Ctrl+L → Cmd+] (Forward)
  },
  // Tab navigation
  prev_tab: {
    from: ['h', '⌃'], to: ['[', '⌘⇧']  // Ctrl+H → Cmd+Shift+[ (Previous tab)
  },
  next_tab: {
    from: ['l', '⌃'], to: [']', '⌘⇧']  // Ctrl+L → Cmd+Shift+] (Next tab)
  },
  // Application switcher (Alt+Tab equivalent)
  prev_app: {
    from: ['h', '⌘⌥⌃'], to: ['⇥', '⌃⇧']  // Ctrl+Cmd+Opt+H → Ctrl+Shift+Tab
  },
  next_app: {
    from: ['l', '⌘⌥⌃'], to: ['⇥', '⌃']    // Ctrl+Cmd+Opt+L → Ctrl+Tab
  }
} as const satisfies Record<string, ControlMapping>
