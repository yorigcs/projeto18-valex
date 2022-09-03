import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { createCardSchema, schemaHandler } from '../schemas'
import { createCardService } from '../services'
import { TransactionTypes } from '../repositories/cardRepository'

interface Card {
  cardType: TransactionTypes
}

export const createCardController = (req: Request<ParamsDictionary, any, Card>, res: Response): Response<any, Record<string, any>> => {
  const { cardType } = req.body
  const ApiKey = req.header('x-api-key')
  const employeeId = parseInt(req.params.employeeId)

  const schema = schemaHandler(createCardSchema, { cardType, ApiKey, employeeId })
  if (schema) {
    return res.status(schema.statusCode).send(schema.body)
  }
  const handleService = async (): Promise<any> => {
    const resp = await createCardService(ApiKey, employeeId, cardType)
    return res.status(resp.statusCode).send(resp.body)
  }
  void handleService()
}
