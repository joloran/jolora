import Store from 'electron-store'

interface StoreType {
  guesses: string[]
  lastClear?: string
}

export const store = new Store<StoreType>({
  defaults: {
    guesses: [],
  },
})
