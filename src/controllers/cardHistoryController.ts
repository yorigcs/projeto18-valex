import { Request, Response } from 'express'
import { cardHistorySchema, schemaHandler } from '../schemas'
import { cardHistoryService } from '../services'
export const cardHistoryController = (req: Request, res: Response): Response<any, Record<string, any>> => {
  const cardId = parseInt(req.params.cardId)
  const cvc = req.params.cvc

  const schema = schemaHandler(cardHistorySchema, { cardId, cvc })
  if (schema) {
    return res.status(schema.statusCode).send(schema.body)
  }
  const handleService = async (): Promise<any> => {
    const resp = await cardHistoryService(cardId, cvc)
    return res.status(resp.statusCode).send(resp.body)
  }
  void handleService()
}
