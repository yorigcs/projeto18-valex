import { InvalidParamError } from '../errors'
import { notFound, ok, serverError, unauthorized } from '../helpers/httpHelper'
import { HttpResponse } from '../protocols'
import { findById } from '../repositories/cardRepository'
import { isValidDate } from '../utils/generateDate'
import { compareHashPassword } from '../utils/passwordHandler'
export const cardActionService = async (cardId: number, action: string, password: string): Promise<HttpResponse> => {
  try {
    const card = await findById(cardId)
    if (!card) return notFound(new InvalidParamError('This card does not exist'))

    if (!isValidDate(card.expirationDate)) return unauthorized(new InvalidParamError('This card expired'))

    const isValidPassword = compareHashPassword(password, card.password)
    if (!isValidPassword) return unauthorized(new InvalidParamError('This password is incorrect'))

    return ok('ok')
  } catch (err) {
    return serverError()
  }
}
