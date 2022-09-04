import { InvalidParamError } from '../errors'
import { notFound, ok, serverError, unauthorized } from '../helpers/httpHelper'
import { findById as findCardById } from '../repositories/cardRepository'
import { decrypter } from '../utils/cryptrHandler'
export const cardHistoryService = async (employeeId: number, cardId: number, cvc: string): Promise<any> => {
  try {
    const card = await findCardById(cardId)
    if (!card) return notFound(new InvalidParamError('This card does not exist'))

    const isValidCVC = decrypter(card.securityCode) === cvc
    if (!isValidCVC) return unauthorized(new InvalidParamError('The cvc is not valid'))

    return ok('okay')
  } catch (err) {
    return serverError()
  }
}
