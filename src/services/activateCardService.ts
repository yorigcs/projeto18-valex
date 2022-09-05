
import { findById, update } from '../repositories/cardRepository'
import { notFound, serverError, created, unauthorized, badRequest } from '../helpers/httpHelper'
import { InvalidParamError } from '../errors'
import { HttpResponse } from '../protocols'
import { decrypter } from '../utils/cryptrHandler'
import { isValidDate } from '../utils/generateDate'
import { createHashPassword } from '../utils/passwordHandler'

export const activateCardService = async (cvc: string, cardId: number, password: string): Promise<HttpResponse> => {
  try {
    const card = await findById(cardId)
    if (!card) return notFound(new InvalidParamError('This card does not exist'))

    if (decrypter(card.securityCode) !== cvc) return unauthorized(new InvalidParamError('cvc is wrong!'))

    if (!isValidDate(card.expirationDate)) return unauthorized(new InvalidParamError('This card expired'))

    if (card.password) return unauthorized(new InvalidParamError('This card is already activated'))

    if (password.length !== 4) return badRequest(new InvalidParamError('The password must be at least 4 characters'))

    await update(card.id, { password: createHashPassword(password) })

    return created('ok')
  } catch (err) {
    return serverError()
  }
}
