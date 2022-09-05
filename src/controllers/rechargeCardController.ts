import { Request, Response } from 'express'
import { rechargeCardSchema, schemaHandler } from '../schemas'

export const rechargeCardController = (req: Request, res: Response): any => {
  const ApiKey = req.header('x-api-key')
  const employeeId = parseInt(req.params.employeeId)
  const cardId = parseInt(req.params.cardId)
  const rechargeAmount = parseInt(req.body.rechargeAmount)

  const schema = schemaHandler(rechargeCardSchema, { ApiKey, employeeId, cardId, rechargeAmount })
  if (schema) {
    return res.status(schema.statusCode).send(schema.body)
  }

  res.send('ok')
}
