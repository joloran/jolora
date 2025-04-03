import { HTTPError } from 'ky'

import { SaveUserRequest } from '~/src/shared/types/ipc/user'

import { api } from '../lib/ky'

export async function saveUser({ req, id }: SaveUserRequest) {
  try {
    await api
      .put(`save-user/${id}`, {
        body: JSON.stringify(req),
      })
      .json<void>()
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorMsg = await error.response.json()
      throw new Error('Erro ao recuperar dados do usuário: ' + errorMsg.message)
    }
  }
}
