import { ReactNode } from 'react'

import { cn } from '../../../lib/utils'
import { KeyValue } from '../../../utils/wordle/keyboard'
import { CharStatus } from '../../../utils/wordle/statuses'

type Props = {
  children?: ReactNode
  value: KeyValue
  width?: number
  status?: CharStatus
  onClick: (value: KeyValue) => void
}

export const Key = ({
  children,
  status,
  width = 40,
  value,
  onClick,
}: Props) => {
  const classes = cn(
    'flex items-center justify-center rounded mx-0.5 text-xs font-bold cursor-pointer',
    {
      'hover:bg-medius-700 active:bg-medius-800': !status,
      'bg-medius-600 text-white hover:bg-medius-700 active:bg-medius-800':
        status === 'absent',
      'bg-green-500 hover:bg-green-600 active:bg-green-700 text-white':
        status === 'correct',
      'bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white':
        status === 'present',
    },
  )

  return (
    <div
      style={{ width: `${width}px`, height: '58px' }}
      className={classes}
      onClick={() => onClick(value)}
    >
      {children || value}
    </div>
  )
}
