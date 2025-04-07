import { ipcMain } from 'electron'

import { IPC } from '~/src/shared/constants/ipc'

import { store } from '../database/store'

ipcMain.handle(IPC.STREAK.INCREMENT, () => {
  const streakCount = (store.get('streak') || 0) + 1

  store.set('streak', streakCount)

  return streakCount
})

ipcMain.handle(IPC.STREAK.CLEAR, () => {
  store.set('streak', null)
})

ipcMain.handle(IPC.STREAK.FETCH, () => {
  const streak = store.get('streak', null)

  return streak
})
