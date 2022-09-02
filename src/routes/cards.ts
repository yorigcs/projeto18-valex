import { Router } from 'express'
import { createCardController } from '../controllers'
const routeCards = Router()

routeCards.post('/createCard/:employeeId', createCardController)

export { routeCards }
