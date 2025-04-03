import { useQuery } from '@tanstack/react-query'
import { UserCircle2 } from 'lucide-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { capitalizeSmart } from '../../utils/capitalize'
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command'

interface SearchBarProps {
  open: boolean
  onOpenChange: (isOpen: boolean) => void
}

export function SearchBar({ open, onOpenChange }: SearchBarProps) {
  const navigate = useNavigate()
  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await window.api.user.fetchUsers()

      return response.data
    },
  })

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        onOpenChange(!open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [open, onOpenChange])

  function handleOpenUser(id: number) {
    navigate(`/user/${id}`)
    onOpenChange(false)
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <div className="border-b border-border p-4">
        <CommandInput
          autoFocus
          placeholder="Buscar usuários..."
          className="focus:outline-none text-sm text-primary placeholder:text-foreground"
        />
      </div>
      <CommandList className="py-2 max-h-48 scrollbar-thin scrollbar-thumb-border scrollbar-track-card">
        <CommandEmpty className="py-3 px-4 text-foreground text-sm">
          Nenhum usuário encontrado.
        </CommandEmpty>

        {data?.map((user) => {
          return (
            <CommandItem
              key={user.id}
              onSelect={() => handleOpenUser(user.id)}
              className="py-3 px-4 text-primary text-sm flex items-center gap-2 hover:bg-medius-700 aria-selected:!bg-border"
            >
              <UserCircle2 className="h-4 w-4 shrink-0 opacity-50" />
              {capitalizeSmart(user.nome_empresa)}
              <span className="sr-only">{user.cnpj}</span>
            </CommandItem>
          )
        })}
      </CommandList>
    </CommandDialog>
  )
}
