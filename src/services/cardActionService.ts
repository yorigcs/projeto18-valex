import { InvalidParamError } from '../errors'
import { badRequest, notFound, ok, serverError, unauthorized } from '../helpers/httpHelper'
import { HttpResponse } from '../protocols'
import { findById, update } from '../repositories/cardRepository'
import { isValidDate } from '../utils/generateDate'
import { compareHashPassword } from '../utils/passwordHandler'
export const cardActionService = async (cardId: number, action: string, password: string): Promise<HttpResponse> => {
  try {
    const card = await findById(cardId)
    if (!card) return notFound(new InvalidParamError('This card does not exist'))

    if (!isValidDate(card.expirationDate)) return unauthorized(new InvalidParamError('This card expired'))

    const isValidPassword = compareHashPassword(password, card.password)
    if (!isValidPassword) return unauthorized(new InvalidParamError('This password is incorrect'))

    if (card.isBlocked && action === 'block') return badRequest(new InvalidParamError('This card is already blocked'))

    if (!card.isBlocked && action === 'unblock') return badRequest(new InvalidParamError('This card is already unblocked'))

    await update(card.id, { isBlocked: action === 'block' })

    return ok(`The card was ${action}ed`)
  } catch (err) {
    return serverError()
  }
}
