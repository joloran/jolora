import { contextBridge } from 'electron'

import { guesses } from './api/guesses'
import { titleBar } from './api/title-bar'
import { updater } from './api/update'
import { user } from './api/user'

declare global {
  export interface Window {
    api: typeof api
  }
}

// Custom APIs for renderer
const api = { user, update: updater, titleBar, guesses }

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.api = api
}
