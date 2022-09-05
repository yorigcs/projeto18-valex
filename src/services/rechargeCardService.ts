import { ok, serverError } from '../helpers/httpHelper'
import { HttpResponse } from '../protocols'

export const rechargeCardService = async (ApiKey: string, employeeId: number, cardId: number, rechargeAmount: number): Promise<HttpResponse> => {
  try {
    return ok('The recharge was successfull')
  } catch (err) {
    return serverError()
  }
}
