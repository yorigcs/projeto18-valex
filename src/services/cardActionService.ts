import { InvalidParamError } from '../errors'
import { notFound, ok, serverError } from '../helpers/httpHelper'
import { HttpResponse } from '../protocols'
import { findById } from '../repositories/cardRepository'
export const cardActionService = async (cardId: number, action: string, password: string): Promise<HttpResponse> => {
  try {
    const card = await findById(cardId)
    if (!card) return notFound(new InvalidParamError('This card does not exist'))

    return ok('ok')
  } catch (err) {
    return serverError()
  }
}
