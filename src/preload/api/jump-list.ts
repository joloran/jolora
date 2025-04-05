import { ipcRenderer } from 'electron'

import { IPC } from '~/src/shared/constants/ipc'
import { RecentUsers } from '~/src/shared/types/ipc/recent-users'

export const jumpList = {
  addRecentUser(req: RecentUsers) {
    return ipcRenderer.invoke(IPC.JUMP_LIST.ADD_USER, req)
  },
  onUserSelected(callback: (username: RecentUsers) => void) {
    ipcRenderer.on(IPC.JUMP_LIST.NAVIGATE_TO, (_, user: RecentUsers) => {
      if (user) {
        callback(user)
      }
    })

    return () => {
      ipcRenderer.removeAllListeners(IPC.JUMP_LIST.NAVIGATE_TO)
    }
  },
}
