import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { User } from '~/src/shared/types/ipc/user'

import { capitalizeSmart } from '../../../utils/capitalize'
import isCNPJ from '../../../utils/cnpj-validator'

const formSchema = z.object({
  businessName: z
    .string()
    .min(3, 'Nome da empresa deve conter ao menos 3 caracteres')
    .transform((name) => capitalizeSmart(name)),
  cnpj: z
    .string()
    .refine(
      (data) => {
        return isCNPJ(data)
      },
      { message: 'CNPJ inválido. Tente novamente!' },
    )
    .transform((data) => data.replace(/[^a-zA-Z0-9]/g, '')),
  role: z.union([z.literal('0'), z.literal('1'), z.literal('2')]),
  connectionUrl: z.string().url('URL é inválida, verifique-a'),
  databaseName: z.string().optional(),
})

type FormSchemaProps = z.infer<typeof formSchema>

export function useUserForm(data: User) {
  const form = useForm<FormSchemaProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: data?.nome_empresa ?? '',
      cnpj: data?.cnpj ?? '',
      connectionUrl: data?.url_conexao ?? '',
      databaseName: data?.database_name ?? '',
      role: data?.role ?? '0',
    },
  })

  async function handleSubmitForm(values: FormSchemaProps) {
    try {
      await window.api.user.saveUser({ id: data.id, req: values })

      toast.success('Empresa alterada com sucesso! 🎉')
    } catch (error) {
      if (error instanceof Error) {
        toast.error('Ocorreu um erro ao salvar usuário!', {
          description: error.message,
        })
      }
    }
  }

  return {
    form,
    handleSubmitForm,
  }
}
