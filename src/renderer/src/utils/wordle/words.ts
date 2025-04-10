import { WORDS } from '../../constants/wordlist'

export const isWordInWordList = (word: string) => {
  return WORDS.includes(word.toLowerCase())
}

export const isWinningWord = (word: string) => {
  return solution === word
}

export const getWordOfDay = () => {
  const epochMs = Date.UTC(2022, 0, 1, 0, 0, 0)
  const now = Date.now()
  const msInTurn = 12 * 60 * 60 * 1000

  const rawIndex = Math.floor((now - epochMs) / msInTurn)
  const index = ((rawIndex % WORDS.length) + WORDS.length) % WORDS.length

  return WORDS[index].toUpperCase()
}

export const solution = getWordOfDay()
