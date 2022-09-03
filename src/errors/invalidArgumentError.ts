export class InvalidArgumentError extends Error {
  message: string
  constructor (paramName: string) {
    super(`Invalid Argument: ${paramName}`)
    this.name = 'InvalidArgumentError'
    this.message = paramName
  }
}
