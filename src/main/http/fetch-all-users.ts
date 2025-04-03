import { FetchAllUsersResponse } from '~/src/shared/types/ipc/user'

import { api } from '../lib/ky'

export async function fetchAllUsers() {
  try {
    const { data } = await api
      .get('fetch-all-users')
      .json<FetchAllUsersResponse>()

    return data
  } catch (error) {
    return []
  }
}
