import { ipcRenderer } from 'electron'

import { IPC } from '~/src/shared/constants/ipc'
import {
  CreateGuessesRequest,
  CreateSolutionRequest,
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
  createSolution(req: CreateSolutionRequest): Promise<void> {
    return ipcRenderer.invoke(IPC.GUESSES_WORDLE.SET_SOLUTION, req)
  },
  fetchSolution(): Promise<string> {
    return ipcRenderer.invoke(IPC.GUESSES_WORDLE.FETCH_SOLUTION)
  },
}
