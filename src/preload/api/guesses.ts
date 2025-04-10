import { ipcRenderer } from 'electron'

import { IPC } from '~/src/shared/constants/ipc'
import {
  CreateGuessesRequest,
  FetchGuessesResponse,
} from '~/src/shared/types/ipc/guesses'

export const guesses = {
  fetchGuesses(): Promise<FetchGuessesResponse> {
    return ipcRenderer.invoke(IPC.GUESSES_WORDLE.FETCH)
  },
  createGuess(req: CreateGuessesRequest): Promise<void> {
    return ipcRenderer.invoke(IPC.GUESSES_WORDLE.CREATE, req)
  },
  clearGuess(): Promise<void> {
    return ipcRenderer.invoke(IPC.GUESSES_WORDLE.CLEAR)
  },
  fetchLastClear(): Promise<string> {
    return ipcRenderer.invoke(IPC.GUESSES_WORDLE.LAST_CLEAR)
  },
}
