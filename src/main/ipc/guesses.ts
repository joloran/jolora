import { ipcMain } from 'electron'

import { IPC } from '~/src/shared/constants/ipc'
import {
  CreateGuessesRequest,
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
  const lastClear = store.get('lastClear', '')
  const today = new Date().toISOString().split('T')[0]

  if (!lastClear || lastClear !== today) {
    store.set('guesses', [])
    store.set('lastClear', today)
  }
})
