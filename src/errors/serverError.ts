export class ServerError extends Error {
  readonly error: string
  constructor () {
    super('An internal error occurred')
    this.name = 'ServerError'
    this.error = 'An internal error occurred'
  }
}
