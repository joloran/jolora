import { WORDS } from '../../constants/wordlist'

export const isWordInWordList = (word: string) => {
  return WORDS.includes(word.toLowerCase())
}

export const getWordOfDay = () => {
  const initialDate = new Date(2022, 0, 1)
  const dateNow = new Date()

  const diffMs = dateNow.getTime() - initialDate.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  const hour = dateNow.getHours()
  const offsetPeriod = hour < 12 ? 0 : 1

  const totalPeriod = diffDays * 2 + offsetPeriod

  const index = totalPeriod % WORDS.length

  return WORDS[index].toUpperCase()
}
