import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { Grid } from '../components/Wordle/Grid/Grid'
import { Keyboard } from '../components/Wordle/Keyboard/Keyboard'
import { Streak } from '../components/Wordle/streak'
import { getWordOfDay, isWordInWordList } from '../utils/wordle/words'

export function Default() {
  const [guesses, setGuesses] = useState<string[]>([])
  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [streak, setStreak] = useState<number | null>(null)
  const [solution, setSolution] = useState('')

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

    if (guesses.includes(currentGuess)) {
      return toast.info('Palavra já foi digitada', {
        description: 'A palavra já foi digitada anteriormente, tente outra',
      })
    }

    const winningWord = solution === currentGuess

    if (currentGuess.length === 5 && guesses.length < 6 && !isGameWon) {
      await window.api.guesses.createGuess({ word: currentGuess })

      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')

      if (winningWord) {
        const streakCount = await window.api.streak.incrementStreak()
        setStreak(streakCount)

        const isBeforeNoon = new Date().getHours() < 12

        toast.success(
          `Você acertou a palavra do turno da ${isBeforeNoon ? 'manhã' : 'tarde'} 🤯🎆`,
        )

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
      let word = await window.api.guesses.fetchSolution()

      const guesses = await window.api.guesses.fetchGuesses()

      const streakCount = await window.api.streak.fetchStreak()

      setStreak(streakCount)

      if (!word) {
        word = getWordOfDay()
      }
      setSolution(word)

      if (guesses.data) {
        const lastWord = guesses.data.at(-1) ?? ''

        setGuesses(guesses.data)

        if (solution && solution === lastWord) {
          setIsGameWon(true)
        } else {
          setIsGameWon(false)
        }
      }
    }

    getGuessesAndStreak()
  }, [solution])

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const newWord = getWordOfDay()

      if (solution !== newWord) {
        await window.api.guesses.createSolution({ solution: newWord })
        setSolution(newWord)
      }
    }, 10 * 1000)

    return () => clearInterval(intervalId)
  }, [solution])

  return (
    <>
      <main className="px-6 py-4 flex items-center justify-center flex-col flex-1 lg:px-8">
        <Grid
          guesses={guesses}
          currentGuess={currentGuess}
          solution={solution}
        />

        {!isGameWon && (
          <Keyboard
            onChar={onChar}
            onDelete={onDelete}
            onEnter={onEnter}
            solution={solution}
            guesses={guesses}
          />
        )}
        {streak && <Streak streak={streak} />}
      </main>
    </>
  )
}
