import joi from 'joi'

export const createCardSchema = joi.object({
  cardType: joi.string()
    .valid('groceries', 'restaurant', 'transport', 'education', 'health').required(),
  ApiKey: joi.string().required(),
  employeeId: joi.number().integer().required()
}).strict()

export const activateCardSchema = joi.object({
  cvc: joi.string().pattern(/^[0-9]*$/).required(),
  employeeId: joi.number().integer().required(),
  password: joi.string().pattern(/^[0-9]*$/).required()
}).strict()

export const cardHistorySchema = joi.object({
  cvc: joi.string().pattern(/^[0-9]*$/).required(),
  cardId: joi.number().integer().required()
}).strict()
