import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { activateCardSchema, schemaHandler } from '../schemas'
import { activateCardService } from '../services/'

interface Card {
  cvc: string
  password: string
}

export const activateCardController = (req: Request<ParamsDictionary, any, Card>, res: Response): Response<any, Record<string, any>> => {
  const { cvc, password } = req.body
  const cardId = parseInt(req.params.cardId)

  const schema = schemaHandler(activateCardSchema, { cvc, cardId, password })
  if (schema) {
    return res.status(schema.statusCode).send(schema.body)
  }
  const handleService = async (): Promise<any> => {
    const resp = await activateCardService(cvc, cardId, password)
    return res.status(resp.statusCode).send(resp.body)
  }
  void handleService()
}
