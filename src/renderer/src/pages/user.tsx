import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { UserForm } from '../components/UserForm/form-user'
import { LoadingForm } from '../components/UserForm/loading'

export function User() {
  const { id } = useParams<{ id: string }>()

  const { data } = useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      if (id) {
        const response = await window.api.user.fetchUserById({ id })

        return response.data
      }
    },
  })

  return <>{!data ? <LoadingForm /> : <UserForm data={data} />}</>
}
