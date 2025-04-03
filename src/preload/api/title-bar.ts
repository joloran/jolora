import { ipcRenderer } from 'electron'

import { IPC } from '~/src/shared/constants/ipc'

export const titleBar = {
  close() {
    return ipcRenderer.send(IPC.TITLEBAR.CLOSE)
  },
  minimize() {
    return ipcRenderer.send(IPC.TITLEBAR.MINIMIZE)
  },
  maximize() {
    return ipcRenderer.send(IPC.TITLEBAR.MAXIMIZE)
  },
}
