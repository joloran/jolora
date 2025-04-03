import { cn } from '../../../lib/utils'
import { CharStatus } from '../../../utils/wordle/statuses'

type Props = {
  value?: string
  status?: CharStatus
}

export function GridCell({ value, status }: Props) {
  const classes = cn(
    'size-12 border-solid border-2 flex items-center justify-center mx-0.5 text-lg font-bold rounded',
    {
      'bg-medius-800 border-medius-600': !status,
      'bg-slate-600 text-white border-slate-500': status === 'absent',
      'bg-green-700 text-white border-green-600': status === 'correct',
      'bg-yellow-700 text-white border-yellow-600': status === 'present',
    },
  )

  return <div className={classes}>{value}</div>
}
