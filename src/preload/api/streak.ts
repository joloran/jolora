import { ipcRenderer } from 'electron'

import { IPC } from '~/src/shared/constants/ipc'

export const streak = {
  incrementStreak(): Promise<number> {
    return ipcRenderer.invoke(IPC.STREAK.INCREMENT)
  },
  fetchStreak(): Promise<number> {
    return ipcRenderer.invoke(IPC.STREAK.FETCH)
  },
  clearStreak(): Promise<void> {
    return ipcRenderer.invoke(IPC.STREAK.CLEAR)
  },
}
