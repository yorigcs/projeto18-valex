import { ok, serverError } from '../helpers/httpHelper'
import { HttpResponse } from '../protocols'

export const purchaseService = async (businessId: number, cardId: number, password: string, purchaseAmount: number): Promise<HttpResponse> => {
  try {
    return ok('ok')
  } catch (err) {
    return serverError()
  }
}
