export class BadRequest extends Error {
  message: string
  constructor (message: string) {
    super(`Bad request: ${message}`)
    this.name = 'BadRequest'
    this.message = `BadRequest: ${message}`
  }
}
