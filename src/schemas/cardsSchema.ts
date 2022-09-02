import joi from 'joi'

export const createCardSchema = joi.object({
  cardType: joi.string()
    .valid('groceries', 'restaurants', 'transport', 'education', 'health').required(),
  ApiKey: joi.string().required(),
  employeeId: joi.number().integer().required()
}).strict()
