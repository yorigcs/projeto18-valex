import { InvalidParamError } from '../errors'
import { notFound, ok, serverError, unauthorized } from '../helpers/httpHelper'
import { HttpResponse } from '../protocols'
import { findById } from '../repositories/cardRepository'

export const purchaseService = async (businessId: number, cardId: number, password: string, purchaseAmount: number): Promise<HttpResponse> => {
  try {
    const card = await findById(cardId)
    if (!card) return notFound(new InvalidParamError('This card does not exist'))

    if (card.isBlocked) return unauthorized(new InvalidParamError('This card is blocked'))
    return ok('ok')
  } catch (err) {
    return serverError()
  }
}
