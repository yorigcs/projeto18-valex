import { ok, serverError } from '../helpers/httpHelper'

export const cardHistoryService = async (employeeId: number, cardId: number, cvc: string): Promise<any> => {
  try {
    return ok('okay')
  } catch (err) {
    return serverError()
  }
}
