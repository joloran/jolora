import { ipcRenderer } from 'electron'

import { IPC } from '~/src/shared/constants/ipc'
import {
  FetchAllUsersResponse,
  FetchUserRequest,
  FetchUserResponse,
  SaveUserRequest,
} from '~/src/shared/types/ipc/user'

export const user = {
  fetchUsers(): Promise<FetchAllUsersResponse> {
    return ipcRenderer.invoke(IPC.USERS.FETCH_ALL)
  },
  fetchUserById(req: FetchUserRequest): Promise<FetchUserResponse> {
    return ipcRenderer.invoke(IPC.USERS.FETCH, req)
  },
  saveUser(req: SaveUserRequest) {
    return ipcRenderer.invoke(IPC.USERS.SAVE, req)
  },
}
