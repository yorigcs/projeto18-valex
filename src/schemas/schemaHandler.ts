import joi from 'joi'
import { unprocessableEntity } from '../helpers/httpHelper'
import { InvalidArgumentError } from '../errors'
import { HttpResponse } from '../protocols'

export const schemaHandler = (schema: joi.ObjectSchema<any>, object: object): HttpResponse => {
  const { error } = schema.validate(object, { abortEarly: false })
  if (error) {
    return unprocessableEntity(new InvalidArgumentError(error.details.map(detail => detail.message).join('')))
  }
}
