import joi from 'joi'

export const createCardSchema = joi.object({
  cardType: joi.string()
    .valid('groceries', 'restaurant', 'transport', 'education', 'health').required(),
  ApiKey: joi.string().required(),
  employeeId: joi.number().integer().required()
}).strict()

export const activateCardSchema = joi.object({
  cvc: joi.string().pattern(/^[0-9]*$/).required(),
  cardId: joi.number().integer().required(),
  password: joi.string().pattern(/^[0-9]*$/).required()
}).strict()

export const cardHistorySchema = joi.object({
  cvc: joi.string().pattern(/^[0-9]*$/).required(),
  cardId: joi.number().integer().required()
}).strict()

export const cardActionSchema = joi.object({
  action: joi.string().valid('block', 'unblock').required(),
  cardId: joi.number().integer().required(),
  password: joi.string().pattern(/^[0-9]*$/).required()
}).strict()

export const rechargeCardSchema = joi.object({
  ApiKey: joi.string().required(),
  cardId: joi.number().integer().required(),
  employeeId: joi.number().integer().required(),
  rechargeAmount: joi.number().min(1).required()
}).strict()

export const purchaseSchema = joi.object({
  businessId: joi.number().integer().required(),
  cardId: joi.number().integer().required(),
  password: joi.string().pattern(/^[0-9]*$/).required(),
  purchaseAmount: joi.number().min(1).required()
}).strict()
