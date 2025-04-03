import { getGuessStatuses } from '../../../utils/wordle/statuses'
import { GridCell } from './GridCell'

type Props = {
  guess: string
}

export const CompletedRow = ({ guess }: Props) => {
  const statuses = getGuessStatuses(guess)

  return (
    <div className="flex justify-center mb-1">
      {guess.split('').map((letter, i) => (
        <GridCell key={i} value={letter} status={statuses[i]} />
      ))}
    </div>
  )
}
