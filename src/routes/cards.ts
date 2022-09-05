import { Router } from 'express'
import { createCardController, activateCardController, cardHistoryController, cardActionController, rechargeCardController, purchaseController } from '../controllers'
const routeCards = Router()

routeCards.post('/createCard/:employeeId', createCardController)

routeCards.patch('/activateCard/:cardId', activateCardController)

routeCards.get('/cardHistory/:cardId/:cvc', cardHistoryController)

routeCards.patch('/cardAction/:cardId/:action', cardActionController)

routeCards.post('/rechargeCard/:employeeId/:cardId', rechargeCardController)

routeCards.post('/purchase/:businessId/:cardId', purchaseController)
export { routeCards }
