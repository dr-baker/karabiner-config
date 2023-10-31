import { to$, toApp } from 'karabiner.ts'

export const launchApp = {
  b: toApp('Safari'), // Browser
  c: toApp('Calendar'),
  d: toIDE('DataGrip'),
  f: toApp('Finder'),
  i: toApp('WeChat'), // IM
  k: toApp('Lens'), // K8s
  m: toApp('Airmail'), // Mail
  n: toApp('Obsidian'), // Notes
  r: toIDE('Rider'),
  s: toApp('Slack'),
  t: toApp('Warp'), // Terminal
  w: toIDE('WebStorm'),
  x: toApp('Xcode'),
  z: toApp('zoom.us'),
  ',': toApp('System Settings'),
}

// `open -a` sometimes gets confused by the non-standard path
function toIDE(name: string) {
  return to$(`open ~/Applications/${name}.app`)
}
