import path from 'node:path'

import { app } from 'electron'

import { IPC } from '../shared/constants/ipc'
import { RecentUsers } from '../shared/types/ipc/recent-users'
import { store } from './database/store'

export function checkJumpListArgs(argv: string[]): string | null {
  const args = argv || process.argv

  const userArg = args.find((arg) => arg.startsWith('--open-user='))

  if (userArg) {
    try {
      const user = JSON.parse(decodeURIComponent(userArg.split('=')[1]))

      return user
    } catch (err) {
      console.error('Erro ao parsear usuário da Jump List:', err)
    }
  }

  return null
}

export function handleOpenUser(
  mainWindow: Electron.BrowserWindow,
  argv: string[],
): void {
  const user = checkJumpListArgs(argv)

  if (user) {
    mainWindow.once('ready-to-show', () => {
      mainWindow.webContents.send(IPC.JUMP_LIST.NAVIGATE_TO, user)
    })

    if (mainWindow.webContents.isLoading() === false) {
      mainWindow.webContents.send(IPC.JUMP_LIST.NAVIGATE_TO, user)
    }
  }
}

export function addRecentUser(username: RecentUsers): void {
  let recentUsers = store.get('recentUsers', [])

  recentUsers = [
    username,
    ...recentUsers.filter((user) => user.id !== username.id),
  ].slice(0, 5)

  store.set('recentUsers', recentUsers)

  const buildIconPath = path.resolve(
    __dirname,
    '..',
    '..',
    '..',
    'resources',
    'building.ico',
  )

  app.setJumpList([
    {
      type: 'custom',
      name: 'Empresas recentes',
      items: recentUsers.map((user) => ({
        type: 'task',
        title: user.name,
        program: process.execPath,
        args: `--open-user=${encodeURIComponent(JSON.stringify(user))}`,
        iconPath: buildIconPath,
        iconIndex: 0,
      })),
    },
  ])
}
