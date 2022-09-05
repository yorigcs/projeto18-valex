import { InvalidParamError } from '../errors'
import { notFound, ok, serverError, unauthorized } from '../helpers/httpHelper'
import { HttpResponse } from '../protocols'
import { findById as findCardById } from '../repositories/cardRepository'
import { Payment, findByCardId as findTransactionsByCardId } from '../repositories/paymentRepository'
import { Recharge, findByCardId as findRechargesByCardId } from '../repositories/rechargeRepository'
import { decrypter } from '../utils/cryptrHandler'
import { formatDate } from '../utils/generateDate'

interface History {
  balance: number
  transactions: Payment []
  recharges: Recharge []
}
export const cardHistoryService = async (cardId: number, cvc: string): Promise<HttpResponse> => {
  try {
    const card = await findCardById(cardId)
    if (!card) return notFound(new InvalidParamError('This card does not exist'))

    const isValidCVC = decrypter(card.securityCode) === cvc
    if (!isValidCVC) return unauthorized(new InvalidParamError('The cvc is not valid'))

    let balance = 0
    const recharges = await findRechargesByCardId(cardId)
    const transactions = await findTransactionsByCardId(cardId)
    recharges.forEach(recharges => {
      balance += recharges.amount
      recharges.timestamp = formatDate(String(recharges.timestamp))
    })
    transactions.forEach(transaction => {
      balance -= transaction.amount
      transaction.timestamp = formatDate(String(transaction.timestamp))
    })

    const cardHistory: History = {
      balance,
      transactions,
      recharges
    }

    return ok(cardHistory)
  } catch (err) {
    return serverError()
  }
}
