import { ChevronLeft } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

import { Search } from '../Search'
import { Separator } from '../ui/separator'
import { ActionButtons } from './ActionButtons'

export function TitleBar() {
  const { pathname } = useLocation()

  return (
    <header className="relative w-full flex justify-center items-center p-2 text-foreground select-none region-drag">
      <div className="absolute left-5 region-no-drag flex gap-3 items-center">
        <ActionButtons />
        {pathname !== '/' && (
          <>
            <Separator className="h-3" orientation="vertical" />
            <Link to="/" className="rounded-md hover:bg-medius-700">
              <ChevronLeft className="size-5 text-muted-foreground" />
            </Link>
          </>
        )}
      </div>
      <Search />
    </header>
  )
}
