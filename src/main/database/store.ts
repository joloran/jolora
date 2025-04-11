import Store from 'electron-store'

import { RecentUsers } from '~/src/shared/types/ipc/recent-users'

interface StoreType {
  guesses: string[]
  lastClear?: string
  recentUsers: RecentUsers[]
  streak: number | null
  solution: string
}

export const store = new Store<StoreType>({
  defaults: {
    guesses: [],
    recentUsers: [],
    streak: null,
    solution: '',
  },
})
