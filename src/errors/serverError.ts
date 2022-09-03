export class ServerError extends Error {
  message: string
  constructor () {
    super('An internal error occurred')
    this.name = 'ServerError'
    this.message = 'An internal error occurred'
  }
}
