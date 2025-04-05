import { ipcMain } from 'electron'

import { IPC } from '~/src/shared/constants/ipc'
import { RecentUsers } from '~/src/shared/types/ipc/recent-users'

import { addRecentUser } from '../jump-list'

ipcMain.handle(IPC.JUMP_LIST.ADD_USER, (_, user: RecentUsers) => {
  addRecentUser(user)
})
