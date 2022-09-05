import { Request, Response } from 'express'
import { schemaHandler, cardActionSchema } from '../schemas'
import { cardActionService } from '../services'

export const cardActionController = (req: Request, res: Response): Response<any, Record<string, any>> => {
  const cardId = parseInt(req.params.cardId)
  const { action } = req.params
  const { password } = req.body
  const schema = schemaHandler(cardActionSchema, { cardId, action, password })
  if (schema) {
    return res.status(schema.statusCode).send(schema.body)
  }
  const handleService = async (): Promise<any> => {
    const resp = await cardActionService(cardId, action, password)
    return res.status(resp.statusCode).send(resp.body)
  }
  void handleService()
}
