import { Request, Response } from 'express'
import { cardHistorySchema, schemaHandler } from '../schemas'
export const cardHistoryController = (req: Request, res: Response): any => {
  const employeeId = parseInt(req.params.employeeId)
  const cardId = parseInt(req.params.cardId)
  const cvc = req.params.cvc

  const schema = schemaHandler(cardHistorySchema, { cvc, employeeId, cardId })
  if (schema) {
    return res.status(schema.statusCode).send(schema.body)
  }
  return res.send('ok')
}
