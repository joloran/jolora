import { GridCell } from './GridCell'

type Props = {
  guess: string
}

export const CurrentRow = ({ guess }: Props) => {
  const splitGuess = guess.split('')
  const emptyCells = Array.from(Array(5 - splitGuess.length))

  return (
    <div className="flex justify-center mb-1">
      {splitGuess.map((letter, i) => (
        <GridCell key={i} value={letter} />
      ))}
      {emptyCells.map((_, i) => (
        <GridCell key={i} />
      ))}
    </div>
  )
}
