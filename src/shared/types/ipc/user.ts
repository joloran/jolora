type Role = '0' | '1' | '2'

export interface User {
  id: number
  nome_empresa: string
  cnpj: string
  role: Role
  url_conexao?: string | null
  database_name?: string | null
}

/**
 * Request
 */

export interface FetchUserRequest {
  id: string | number
}

export interface SaveUserRequest {
  id: string | number
  req: Partial<User>
}

/**
 * Response
 */

export interface FetchAllUsersResponse {
  data: User[]
}

export interface FetchUserResponse {
  data: User
}
