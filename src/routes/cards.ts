import { Router } from 'express'
import { createCardController, activateCardController, cardHistoryController, cardActionController, rechargeCardController } from '../controllers'
const routeCards = Router()

routeCards.post('/createCard/:employeeId', createCardController)

routeCards.post('/activateCard/:employeeId', activateCardController)

routeCards.get('/cardHistory/:cardId/:cvc', cardHistoryController)

routeCards.patch('/cardAction/:cardId/:action', cardActionController)

routeCards.post('/rechargeCard/:employeeId/:cardId', rechargeCardController)
export { routeCards }
