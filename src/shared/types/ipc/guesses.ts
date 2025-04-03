/**
 * Request
 */

export interface CreateGuessesRequest {
  word: string
}

/**
 * Response
 */

export interface FetchGuessesResponse {
  data: string[]
}
