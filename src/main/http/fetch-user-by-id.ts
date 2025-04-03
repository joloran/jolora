import { HTTPError } from 'ky'

import { FetchUserResponse } from '~/src/shared/types/ipc/user'

import { api } from '../lib/ky'

export async function fetchUserById(id: string | number) {
  try {
    const { data } = await api
      .get(`fetch-user-by-id/${id}`)
      .json<FetchUserResponse>()

    return data
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorMsg = await error.response.json()
      throw new Error('Erro ao recuperar dados do usuário: ' + errorMsg.message)
    }
  }
}
