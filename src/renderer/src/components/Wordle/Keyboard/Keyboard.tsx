import { useCallback, useEffect } from 'react'

import { KeyValue } from '../../../utils/wordle/keyboard'
import { getStatuses } from '../../../utils/wordle/statuses'
import { Key } from './Key'

type Props = {
  onChar: (value: string) => void
  onDelete: () => void
  onEnter: () => void
  solution: string
  guesses: string[]
}

export const Keyboard = ({
  onChar,
  onDelete,
  onEnter,
  solution,
  guesses,
}: Props) => {
  const charStatuses = getStatuses(guesses, solution)

  const onClick = useCallback(
    (value: KeyValue) => {
      if (value === 'ENTER') {
        return onEnter()
      }
      if (value === 'DELETE') {
        return onDelete()
      }
      return onChar(value)
    },
    [onChar, onDelete, onEnter],
  )

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase()

      if (key === 'ENTER') return onEnter()
      if (key === 'BACKSPACE') return onDelete()

      if (/^[A-Z]$/.test(key)) {
        return onChar(key)
      }
    }

    window.addEventListener('keydown', listener)
    return () => window.removeEventListener('keydown', listener)
  }, [onChar, onDelete, onEnter])

  return (
    <div>
      <div className="flex justify-center mb-1">
        <Key value="Q" onClick={onClick} status={charStatuses.Q} />
        <Key value="W" onClick={onClick} status={charStatuses.W} />
        <Key value="E" onClick={onClick} status={charStatuses.E} />
        <Key value="R" onClick={onClick} status={charStatuses.R} />
        <Key value="T" onClick={onClick} status={charStatuses.T} />
        <Key value="Y" onClick={onClick} status={charStatuses.Y} />
        <Key value="U" onClick={onClick} status={charStatuses.U} />
        <Key value="I" onClick={onClick} status={charStatuses.I} />
        <Key value="O" onClick={onClick} status={charStatuses.O} />
        <Key value="P" onClick={onClick} status={charStatuses.P} />
      </div>
      <div className="flex justify-center mb-1">
        <Key value="A" onClick={onClick} status={charStatuses.A} />
        <Key value="S" onClick={onClick} status={charStatuses.S} />
        <Key value="D" onClick={onClick} status={charStatuses.D} />
        <Key value="F" onClick={onClick} status={charStatuses.F} />
        <Key value="G" onClick={onClick} status={charStatuses.G} />
        <Key value="H" onClick={onClick} status={charStatuses.H} />
        <Key value="J" onClick={onClick} status={charStatuses.J} />
        <Key value="K" onClick={onClick} status={charStatuses.K} />
        <Key value="L" onClick={onClick} status={charStatuses.L} />
      </div>
      <div className="flex justify-center">
        <Key width={65.4} value="ENTER" onClick={onClick}>
          Enviar
        </Key>
        <Key value="Z" onClick={onClick} status={charStatuses.Z} />
        <Key value="X" onClick={onClick} status={charStatuses.X} />
        <Key value="C" onClick={onClick} status={charStatuses.C} />
        <Key value="V" onClick={onClick} status={charStatuses.V} />
        <Key value="B" onClick={onClick} status={charStatuses.B} />
        <Key value="N" onClick={onClick} status={charStatuses.N} />
        <Key value="M" onClick={onClick} status={charStatuses.M} />
        <Key width={65.4} value="DELETE" onClick={onClick}>
          Deletar
        </Key>
      </div>
    </div>
  )
}
