import { ok, serverError } from '../helpers/httpHelper'
import { HttpResponse } from '../protocols'

export const cardActionService = async (): Promise<HttpResponse> => {
  try {
    return ok('ok')
  } catch (err) {
    return serverError()
  }
}
