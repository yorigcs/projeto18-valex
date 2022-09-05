export class InvalidArgumentError extends Error {
  readonly error: string
  constructor (paramName: string) {
    super(`Invalid Argument: ${paramName}`)
    this.name = 'InvalidArgumentError'
    this.error = paramName
  }
}
