import { ipcMain } from 'electron'

import { IPC } from '~/src/shared/constants/ipc'
import {
  CreateGuessesRequest,
  CreateSolutionRequest,
  FetchGuessesResponse,
} from '~/src/shared/types/ipc/guesses'

import { store } from '../database/store'

ipcMain.handle(
  IPC.GUESSES_WORDLE.CREATE,
  (_, { word }: CreateGuessesRequest) => {
    const tentativas = store.get('guesses', [])
    tentativas.push(word)
    store.set('guesses', tentativas)
  },
)

ipcMain.handle(IPC.GUESSES_WORDLE.FETCH, (): FetchGuessesResponse => {
  const guesses = store.get('guesses', [])

  return {
    data: guesses,
  }
})

ipcMain.handle(IPC.GUESSES_WORDLE.CLEAR, () => {
  const now = new Date()
  const date = now.toISOString().split('T')[0]
  const hour = now.getHours()

  const shift = hour < 12 ? 'm' : 't'
  const currentPeriod = `${date}-${shift}`

  const lastClear = store.get('lastClear', '')

  if (lastClear !== currentPeriod) {
    store.set('guesses', [])
    store.set('lastClear', currentPeriod)
    store.set('solution', '')
  }
})

ipcMain.handle(IPC.GUESSES_WORDLE.LAST_CLEAR, () => {
  const lastClear = store.get('lastClear', '')

  return lastClear
})

ipcMain.handle(
  IPC.GUESSES_WORDLE.SET_SOLUTION,
  (_, { solution }: CreateSolutionRequest) => {
    const word = store.get('solution', '')

    if (word !== solution) {
      store.set('solution', solution)
    }
  },
)

ipcMain.handle(IPC.GUESSES_WORDLE.FETCH_SOLUTION, () => {
  const word = store.get('solution', '')

  return word
})
