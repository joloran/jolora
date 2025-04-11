import { getGuessStatuses } from '../../../utils/wordle/statuses'
import { GridCell } from './GridCell'

type Props = {
  guess: string
  solution: string
}

export const CompletedRow = ({ guess, solution }: Props) => {
  const statuses = getGuessStatuses(guess, solution)

  return (
    <div className="flex justify-center mb-1">
      {guess.split('').map((letter, i) => (
        <GridCell key={i} value={letter} status={statuses[i]} />
      ))}
    </div>
  )
}
