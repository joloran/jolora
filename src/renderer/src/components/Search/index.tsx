import { SearchIcon } from 'lucide-react'
import { useState } from 'react'

import { SearchBar } from '../SearchBar'
import { Button } from '../ui/button'

export function Search() {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)

  function handleSearchChange(state: boolean) {
    setIsSearchOpen(state)
  }

  return (
    <>
      <Button
        variant="ghost"
        className="w-1/3 region-no-drag border-bo"
        onClick={() => handleSearchChange(true)}
      >
        <SearchIcon />
        Buscar por usuário
      </Button>
      <SearchBar open={isSearchOpen} onOpenChange={handleSearchChange} />
    </>
  )
}
