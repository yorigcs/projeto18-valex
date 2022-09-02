import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import schemaHandler from '../utils/schemaHandle'
import { createCardSchema } from '../schemas'
import { createCardService } from '../services/createCardService'
import { NotFound, Unauthorized, InternalError } from '../errors'

interface Card {
  cardType: string
}
export const createCardController = (req: Request<ParamsDictionary, any, Card>, res: Response): Response<any, Record<string, any>> => {
  const { cardType } = req.body
  const ApiKey = req.header('x-api-key')
  const employeeId = parseInt(req.params.employeeId)

  const schemaValidator = schemaHandler(createCardSchema, { cardType, ApiKey, employeeId })
  if (schemaValidator) {
    return res.status(422).json({ message: schemaValidator })
  }
  createCardService(ApiKey, employeeId)
    .then(() => res.status(201).send('Ok'))
    .catch((err) => {
      if (err instanceof NotFound) {
        return res.status(404).send(err)
      } else if (err instanceof Unauthorized) {
        return res.status(401).send(err)
      }
      res.status(500).send(new InternalError())
    })
}
