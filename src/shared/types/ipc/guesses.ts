/**
 * Request
 */

export interface CreateGuessesRequest {
  word: string
}

export interface CreateSolutionRequest {
  solution: string
}

/**
 * Response
 */

export interface FetchGuessesResponse {
  data: string[]
}
