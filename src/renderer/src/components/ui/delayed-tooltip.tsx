import { TooltipPortal } from '@radix-ui/react-tooltip'
import { useState } from 'react'

import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip'

export function DelayedTooltipItem({
  children,
  tooltip,
}: {
  children: React.ReactNode
  tooltip: string
}) {
  const [open, setOpen] = useState(false)
  let timeout: NodeJS.Timeout

  const handlePointerEnter = () => {
    timeout = setTimeout(() => setOpen(true), 500)
  }

  const handlePointerLeave = () => {
    clearTimeout(timeout)
    setOpen(false)
  }

  return (
    <Tooltip open={open}>
      <TooltipTrigger asChild>
        <div
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
        >
          {children}
        </div>
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent className="text-xs break-words max-w-56">
          {tooltip}
        </TooltipContent>
      </TooltipPortal>
    </Tooltip>
  )
}
