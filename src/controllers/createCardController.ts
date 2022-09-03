import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { createCardSchema, schemaHandler } from '../schemas'
import { createCardService } from '../services/createCardService'
import { TransactionTypes } from '../repositories/cardRepository'

interface Card {
  cardType: TransactionTypes
}

export const createCardController = (req: Request<ParamsDictionary, any, Card>, res: Response): Response<any, Record<string, any>> => {
  const { cardType } = req.body
  const ApiKey = req.header('x-api-key')
  const employeeId = parseInt(req.params.employeeId)

  const schemaValidator = schemaHandler(createCardSchema, { cardType, ApiKey, employeeId })
  if (schemaValidator) {
    return res.status(422).json({ message: schemaValidator })
  }
  const handleService = async (): Promise<any> => {
    const resp = await createCardService(ApiKey, employeeId, cardType)
    return res.status(resp.statusCode).send(resp.body)
  }
  void handleService()
}
