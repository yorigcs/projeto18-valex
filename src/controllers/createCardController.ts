import { Request, Response } from 'express'
import schemaHandler from '../utils/schemaHandle'
import { createCardSchema } from '../schemas'

export const createCardController = (req: Request, res: Response): Response<any, Record<string, any>> => {
  const { cardType } = req.body
  const ApiKey = req.header('x-api-key')
  const schemaValidator = schemaHandler(createCardSchema, { cardType, ApiKey })
  if (schemaValidator) {
    return res.status(422).json({ errors: schemaValidator })
  }

  res.status(200).send('Ok')
}
