import { Router } from 'express'
import { createCardController, activateCardController } from '../controllers'
const routeCards = Router()

routeCards.post('/createCard/:employeeId', createCardController)

routeCards.post('/activateCard/:employeeId', activateCardController)
export { routeCards }
