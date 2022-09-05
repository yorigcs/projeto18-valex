import { Request, Response } from 'express'
import { purchaseSchema, schemaHandler } from '../schemas'
import { purchaseService } from '../services'

export const purchaseController = (req: Request, res: Response): Response<any, Record<string, any>> => {
  const businessId = parseInt(req.params.businessId)
  const cardId = parseInt(req.params.cardId)
  const purchaseAmount = parseInt(req.body.purchaseAmount)
  const { password } = req.body
  const schema = schemaHandler(purchaseSchema, { businessId, cardId, password, purchaseAmount })
  if (schema) {
    return res.status(schema.statusCode).send(schema.body)
  }

  const handleService = async (): Promise<any> => {
    const resp = await purchaseService(businessId, cardId, password, purchaseAmount)
    return res.status(resp.statusCode).send(resp.body)
  }
  void handleService()
}
