export class InvalidParamError extends Error {
  message: string
  constructor (paramName: string) {
    super(`Invalid Param: ${paramName}`)
    this.name = 'InvalidParamError'
    this.message = paramName
  }
}
