import { InvalidParamError } from '../errors'
import { notFound, ok, serverError } from '../helpers/httpHelper'
import { findById } from '../repositories/cardRepository'
export const cardHistoryService = async (employeeId: number, cardId: number, cvc: string): Promise<any> => {
  try {
    const card = await findById(cardId)
    if (!card) return notFound(new InvalidParamError('This card does not exist'))
    return ok('okay')
  } catch (err) {
    return serverError()
  }
}
