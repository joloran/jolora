import { Route, Routes as RouterRoutes } from 'react-router-dom'

import { Default } from './src/pages/default'
import { User } from './src/pages/user'

export function Routes() {
  return (
    <RouterRoutes>
      <Route path="/" element={<Default />} />
      <Route path="/user/:id" element={<User />} />
    </RouterRoutes>
  )
}
