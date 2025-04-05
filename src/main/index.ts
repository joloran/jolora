import './ipc'
import './database/store'

import { app, BrowserWindow } from 'electron'
import { autoUpdater } from 'electron-updater'

import trayIcon from '~/resources/icon.png'

import { createWindowEvents } from './events'
import { handleOpenUser } from './jump-list'
import { createShortcuts } from './shortcuts'
import { titleBarFunctions } from './title-bar'
import { createTray } from './tray'
import { createUpdater } from './update'

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

if (require('electron-squirrel-startup')) {
  app.quit()
}

app.setAppUserModelId('Medius')

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    minWidth: 700,
    minHeight: 600,
    backgroundColor: '#17141f',
    titleBarStyle: 'hidden',
    titleBarOverlay: false,
    ...(process.platform !== 'darwin' ? { icon: trayIcon } : {}),
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      contextIsolation: true,
      sandbox: false,
    },
  })

  createTray(mainWindow)
  createShortcuts(mainWindow)
  createWindowEvents(mainWindow)
  createUpdater(mainWindow)

  titleBarFunctions(mainWindow)

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  autoUpdater.autoInstallOnAppQuit = true
  autoUpdater.checkForUpdates()
}

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (_, argv) => {
    const mainWindow = BrowserWindow.getAllWindows()[0]
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore()
      }

      mainWindow.focus()
      handleOpenUser(mainWindow, argv)
    }
  })

  app.on('ready', createWindow)
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.on('before-quit', () => {
  const windows = BrowserWindow.getAllWindows()
  windows.forEach((window) => window.destroy())
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
