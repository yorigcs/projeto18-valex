export class NotFound extends Error {
  message: string
  constructor (data: string) {
    super(`not found: ${data}`)
    this.name = 'NotFound'
    this.message = `not found: ${data}`
  }
}
