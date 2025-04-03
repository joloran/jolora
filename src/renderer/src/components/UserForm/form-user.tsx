import { User } from '~/src/shared/types/ipc/user'

import { CNPJFormatter } from '../../utils/cnpj-formatter'
import { Button } from '../ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { useUserForm } from './hooks/useForm'

export interface UserFormProps {
  data: User
}

export function UserForm({ data }: UserFormProps) {
  const { form, handleSubmitForm } = useUserForm(data)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitForm)}
        className="flex flex-1 justify-center items-center px-4 py-2"
      >
        <div className="flex flex-col space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Empresa</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nome da empresa"
                      className="focus-visible:ring-0 focus-visible:ring-offset-0 border-0 border-b rounded-none focus-visible:border-medius-400 placeholder:text-xs"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cnpj"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">CNPJ</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="CNPJ da empresa"
                      className="focus-visible:ring-0 focus-visible:ring-offset-0 border-0 border-b rounded-none focus-visible:border-medius-400 placeholder:text-xs"
                      {...field}
                      value={CNPJFormatter(field.value)}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="connectionUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">URL de conexão</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="http(s)://"
                      className="focus-visible:ring-0 focus-visible:ring-offset-0 border-0 border-b rounded-none focus-visible:border-medius-400 placeholder:text-xs"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Cargo do terminal</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="focus-visible:ring-0 focus-visible:ring-offset-0 border-0 border-b rounded-none focus-visible:border-medius-400 text-xs min-w-64">
                        <SelectValue placeholder="Selecione um cargo para os terminais" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">Administrador</SelectItem>
                      <SelectItem value="1">Caixa</SelectItem>
                      <SelectItem value="2">Com mesa</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="databaseName"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel className="text-xs">
                    Nome do banco de dados
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nome do banco de dados(opcional)"
                      className="focus-visible:ring-0 focus-visible:ring-offset-0 border-0 border-b rounded-none focus-visible:border-medius-400 placeholder:text-xs"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="col-span-2"
            disabled={form.formState.isSubmitting}
          >
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  )
}
