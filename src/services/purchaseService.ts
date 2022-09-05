import { InvalidParamError } from '../errors'
import { notFound, ok, serverError, unauthorized } from '../helpers/httpHelper'
import { HttpResponse } from '../protocols'
import { findById } from '../repositories/cardRepository'
import { isValidDate } from '../utils/generateDate'
import { compareHashPassword } from '../utils/passwordHandler'

export const purchaseService = async (businessId: number, cardId: number, password: string, purchaseAmount: number): Promise<HttpResponse> => {
  try {
    const card = await findById(cardId)
    if (!card) return notFound(new InvalidParamError('This card does not exist'))

    if (card.isBlocked) return unauthorized(new InvalidParamError('This card is blocked'))

    if (!card.password) return unauthorized(new InvalidParamError('This card is not activated'))

    if (!isValidDate(card.expirationDate)) return unauthorized(new InvalidParamError('This card expired'))

    const isValidPassword = compareHashPassword(password, card.password)
    if (!isValidPassword) return unauthorized(new InvalidParamError('This password is incorrect'))

    return ok('ok')
  } catch (err) {
    return serverError()
  }
}
