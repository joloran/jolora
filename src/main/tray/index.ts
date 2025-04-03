import path from 'node:path'

import { BrowserWindow, Menu, Tray } from 'electron'

import { trayEvents } from './events'

export function createTray(window: BrowserWindow) {
  const isMacOS = process.platform === 'darwin'

  const iconPath = path.resolve(__dirname, 'icons', 'trayWindows.ico')

  const icon = isMacOS
    ? path.resolve(__dirname, 'icons', 'mediusTemplate@2x.png')
    : iconPath

  const tray = new Tray(icon)

  const menu = Menu.buildFromTemplate([
    { label: 'Medius', enabled: false },
    { type: 'separator' },
    {
      label: 'Sair',
      role: 'quit',
    },
  ])

  tray.setTitle('Medius')
  tray.setToolTip('Medius')
  tray.setContextMenu(menu)

  trayEvents({ tray, menu, window })
}
