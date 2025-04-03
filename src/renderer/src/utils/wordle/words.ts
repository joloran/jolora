import { WORDS } from '../../constants/wordlist'

export const isWordInWordList = (word: string) => {
  return WORDS.includes(word.toLowerCase())
}

export const isWinningWord = (word: string) => {
  return solution === word
}

export const getWordOfDay = () => {
  const epochMs = 1641013200000
  const now = Date.now()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay) % WORDS.length

  return WORDS[index].toUpperCase()
}

export const solution = getWordOfDay()
