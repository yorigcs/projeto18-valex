import joi from 'joi'

export const createCardSchema = joi.object({
  cardType: joi.string()
    .valid('groceries', 'restaurant', 'transport', 'education', 'health').required(),
  ApiKey: joi.string().required(),
  employeeId: joi.number().integer().required()
}).strict()
