import { Request, Response } from 'express'
import { rechargeCardSchema, schemaHandler } from '../schemas'
import { rechargeCardService } from '../services'

export const rechargeCardController = (req: Request, res: Response): Response<any, Record<string, any>> => {
  const ApiKey = req.header('x-api-key')
  const employeeId = parseInt(req.params.employeeId)
  const cardId = parseInt(req.params.cardId)
  const rechargeAmount = parseInt(req.body.rechargeAmount)

  const schema = schemaHandler(rechargeCardSchema, { ApiKey, employeeId, cardId, rechargeAmount })
  if (schema) {
    return res.status(schema.statusCode).send(schema.body)
  }

  const handleService = async (): Promise<any> => {
    const resp = await rechargeCardService(ApiKey, employeeId, cardId, rechargeAmount)
    return res.status(resp.statusCode).send(resp.body)
  }
  void handleService()
}
