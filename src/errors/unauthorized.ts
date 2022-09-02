export class Unauthorized extends Error {
  message: string
  constructor (message: string) {
    super(`Unauthorized: ${message}`)
    this.name = 'Unauthorized'
    this.message = `Unauthorized: ${message}`
  }
}
