import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import schemaHandler from '../utils/schemaHandle'
import { createCardSchema } from '../schemas'
import { createCardService } from '../services/createCardService'
import { NotFound } from '../errors'

interface Card {
  cardType: string
}
export const createCardController = (req: Request<ParamsDictionary, any, Card>, res: Response): Response<any, Record<string, any>> => {
  const { cardType } = req.body
  const ApiKey = req.header('x-api-key')
  const employeeId = parseInt(req.params.employeeId)

  const schemaValidator = schemaHandler(createCardSchema, { cardType, ApiKey, employeeId })
  if (schemaValidator) {
    return res.status(422).json({ errors: schemaValidator })
  }
  createCardService(ApiKey, employeeId)
    .then(() => res.status(201).send('Ok'))
    .catch((err) => {
      if (err instanceof NotFound) {
        return res.status(404).send(err)
      }
      res.status(500).json({ message: 'An internal error occurred' })
    })
}
