export class InvalidParamError extends Error {
  readonly error: string
  constructor (paramName: string) {
    super(`Invalid Param: ${paramName}`)
    this.name = 'InvalidParamError'
    this.error = paramName
  }
}
