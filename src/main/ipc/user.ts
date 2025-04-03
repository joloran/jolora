import { ipcMain } from 'electron'

import { IPC } from '~/src/shared/constants/ipc'
import {
  FetchAllUsersResponse,
  FetchUserRequest,
  FetchUserResponse,
  SaveUserRequest,
} from '~/src/shared/types/ipc/user'

import { fetchAllUsers } from '../http/fetch-all-users'
import { fetchUserById } from '../http/fetch-user-by-id'
import { saveUser } from '../http/save-user'

ipcMain.handle(
  IPC.USERS.FETCH_ALL,
  async (): Promise<FetchAllUsersResponse> => {
    const data = await fetchAllUsers()

    return { data }
  },
)

ipcMain.handle(
  IPC.USERS.FETCH,
  async (
    _,
    { id }: FetchUserRequest,
  ): Promise<FetchUserResponse | undefined> => {
    try {
      const data = await fetchUserById(id)

      if (!data) {
        throw new Error('Usuário não encontrado.')
      }

      return { data }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
    }
  },
)

ipcMain.handle(
  IPC.USERS.SAVE,
  async (_, { req, id }: SaveUserRequest): Promise<void> => {
    try {
      await saveUser({ req, id })
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
    }
  },
)
