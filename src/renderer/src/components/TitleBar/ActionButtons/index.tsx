import { Button } from '../../ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../ui/tooltip'

export function ActionButtons() {
  function handleCloseButton() {
    window.api.titleBar.close()
  }

  function handleMinimizeButton() {
    window.api.titleBar.minimize()
  }

  function handleMaximizeButton() {
    window.api.titleBar.maximize()
  }

  return (
    <div className="space-x-2 flex">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="action"
              onClick={handleCloseButton}
              className="bg-red-500 rounded-full hover:bg-red-700"
            />
          </TooltipTrigger>
          <TooltipContent className="text-xs">Fechar</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="action"
              onClick={handleMinimizeButton}
              className="bg-yellow-500 rounded-full hover:bg-yellow-700"
            />
          </TooltipTrigger>
          <TooltipContent className="text-xs">Minimizar</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="action"
              onClick={handleMaximizeButton}
              className="bg-green-500 rounded-full hover:bg-green-700"
            />
          </TooltipTrigger>
          <TooltipContent className="text-xs">Maximizar</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
