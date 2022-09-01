import joi from 'joi'

const schemaHandle = (schema: joi.ObjectSchema<any>, object: object): boolean | string[] => {
  const { error } = schema.validate(object, { abortEarly: false })
  if (error) {
    return error.details.map(detail => detail.message)
  }
  return false
}

export default schemaHandle
