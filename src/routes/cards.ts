import { Router } from 'express'
import { createCardController, activateCardController, cardHistoryController } from '../controllers'
const routeCards = Router()

routeCards.post('/createCard/:employeeId', createCardController)

routeCards.post('/activateCard/:employeeId', activateCardController)

routeCards.get('/cardHistory/:employeeId/:cardId/:cvc', cardHistoryController)
export { routeCards }
