export class InternalError extends Error {
  message: string
  constructor () {
    super('An internal error occurred')
    this.name = 'InternalError'
    this.message = 'An internal error occurred'
  }
}
