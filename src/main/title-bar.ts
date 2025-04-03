import { BrowserWindow, ipcMain } from 'electron'

import { IPC } from '../shared/constants/ipc'

export function titleBarFunctions(window: BrowserWindow) {
  ipcMain.on(IPC.TITLEBAR.MINIMIZE, () => {
    window.minimize()
  })

  ipcMain.on(IPC.TITLEBAR.MAXIMIZE, () => {
    if (window.isMaximized()) {
      window.unmaximize()
    } else {
      window.maximize()
    }
  })

  ipcMain.on(IPC.TITLEBAR.CLOSE, () => {
    window.close()
  })
}
