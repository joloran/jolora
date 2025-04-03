import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { AlertUpdater } from '../components/ui/alert-updater'
import { Grid } from '../components/Wordle/Grid/Grid'
import { Keyboard } from '../components/Wordle/Keyboard/Keyboard'
import {
  isWinningWord,
  isWordInWordList,
  solution,
} from '../utils/wordle/words'

export function Default() {
  const [guesses, setGuesses] = useState<string[]>([])
  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [removeKeyBoard, setRemoveKeyBoard] = useState(false)
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)

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
      setIsWordNotFoundAlertOpen(true)
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false)
      }, 2000)
    }

    const winningWord = isWinningWord(currentGuess)

    if (currentGuess.length === 5 && guesses.length < 6 && !isGameWon) {
      await window.api.guesses.createGuess({ word: currentGuess })

      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')

      if (winningWord) {
        return setIsGameWon(true)
      }

      if (guesses.length === 5) {
        setIsGameLost(true)
        return setTimeout(() => {
          setIsGameLost(false)
        }, 2000)
      }
    }
  }

  useEffect(() => {
    if (isWordNotFoundAlertOpen) {
      toast.info('Palavra não encontrada', {
        description: 'A palavra digitada não foi encontrada ou não existe',
      })
    }

    if (isGameLost) {
      toast.error('Você perdeu 😬', {
        description: `A palavra correta era ${solution}`,
      })
    }

    if (isGameWon) {
      toast.success('Você acertou a palavra do dia 🤯🎆')
      setRemoveKeyBoard(true)
    }
  }, [isWordNotFoundAlertOpen, isGameLost, isGameWon])

  useEffect(() => {
    async function getGuesses() {
      await window.api.guesses.clearGuess()
      const guesses = await window.api.guesses.fetchGuesses()

      if (guesses.data) {
        const lastWord = guesses.data.at(-1) ?? ''

        setGuesses(guesses.data)

        if (isWinningWord(lastWord)) {
          setRemoveKeyBoard(true)
        }
      }
    }

    getGuesses()
  }, [])

  return (
    <>
      <main className="px-6 py-4 flex items-center justify-center flex-col flex-1 lg:px-8">
        <Grid guesses={guesses} currentGuess={currentGuess} />

        {!removeKeyBoard && (
          <Keyboard
            onChar={onChar}
            onDelete={onDelete}
            onEnter={onEnter}
            guesses={guesses}
          />
        )}
      </main>
      <AlertUpdater />
    </>
  )
}
