export const IPC = {
  USERS: {
    FETCH_ALL: 'users: fetch-all',
    FETCH: 'users: fetch',
    SAVE: 'users: save',
  },
  TITLEBAR: {
    CLOSE: 'close: app',
    MINIMIZE: 'minimize: app',
    MAXIMIZE: 'maximize: app',
  },
  GUESSES_WORDLE: {
    CREATE: 'wordle-guess: add',
    CLEAR: 'wordle-guess: clear',
    FETCH: 'wordle-guess: save',
    LAST_CLEAR: 'wordle-guess: get last clear',
    SET_SOLUTION: 'wordle-guess: set solution',
    FETCH_SOLUTION: 'wordle-guess: get solution',
  },
  JUMP_LIST: {
    ADD_USER: 'jump_list: add-recent-user',
    NAVIGATE_TO: 'jump_list: navigate-to-user',
  },
  STREAK: {
    INCREMENT: 'streak-wordle: increment streak',
    FETCH: 'streak-wordle: fetch streak',
    CLEAR: 'streak-wordle: clear streak',
  },
}
