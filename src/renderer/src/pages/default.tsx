import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { Grid } from '../components/Wordle/Grid/Grid'
import { Keyboard } from '../components/Wordle/Keyboard/Keyboard'
// import { Streak } from '../components/Wordle/streak'
import {
  isWinningWord,
  isWordInWordList,
  solution,
} from '../utils/wordle/words'

export function Default() {
  const [guesses, setGuesses] = useState<string[]>([])
  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [streak, setStreak] = useState<number | null>(null)

  function onChar(value: string) {
    if (currentGuess.length < 5 && guesses.length < 6) {
      setCurrentGuess(`${currentGuess}${value}`)
    }
  }

  function onDelete() {
    setCurrentGuess(currentGuess.slice(0, -1))
  }

  async function onEnter() {
    if (currentGuess === '') return

    if (!isWordInWordList(currentGuess)) {
      return toast.info('Palavra não encontrada', {
        description: 'A palavra digitada não foi encontrada ou não existe',
      })
    }

    const winningWord = isWinningWord(currentGuess)

    if (currentGuess.length === 5 && guesses.length < 6 && !isGameWon) {
      await window.api.guesses.createGuess({ word: currentGuess })

      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')

      if (winningWord) {
        const streakCount = await window.api.streak.incrementStreak()
        setStreak(streakCount)

        toast.success('Você acertou a palavra do dia 🤯🎆')

        return setIsGameWon(true)
      }

      if (guesses.length === 5) {
        await window.api.streak.clearStreak()
        setStreak(null)

        return toast.error('Você perdeu 😬', {
          description: `A palavra correta era ${solution}`,
        })
      }
    }
  }

  useEffect(() => {
    async function getGuessesAndStreak() {
      await window.api.guesses.clearGuess()
      const guesses = await window.api.guesses.fetchGuesses()

      const streakCount = await window.api.streak.fetchStreak()

      setStreak(streakCount)

      if (guesses.data) {
        const lastWord = guesses.data.at(-1) ?? ''

        setGuesses(guesses.data)

        if (isWinningWord(lastWord)) {
          setIsGameWon(true)
        }
      }
    }

    getGuessesAndStreak()
  }, [])

  return (
    <>
      <main className="px-6 py-4 flex items-center justify-center flex-col flex-1 lg:px-8">
        <Grid guesses={guesses} currentGuess={currentGuess} />

        {!isGameWon && (
          <Keyboard
            onChar={onChar}
            onDelete={onDelete}
            onEnter={onEnter}
            guesses={guesses}
          />
        )}
        {/* {streak && <Streak streak={streak} />} */}
      </main>
    </>
  )
}
