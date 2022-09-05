import { InvalidParamError } from '../errors'
import { ok, serverError, notFound, unauthorized } from '../helpers/httpHelper'
import { HttpResponse } from '../protocols'
import { findByApiKey } from '../repositories/companyRepository'
import { findById as findEmployeeById } from '../repositories/employeeRepository'

export const rechargeCardService = async (apiKey: string, employeeId: number, cardId: number, rechargeAmount: number): Promise<HttpResponse> => {
  try {
    const company = await findByApiKey(apiKey)
    if (!company) return notFound(new InvalidParamError('x-api-key'))

    const employee = await findEmployeeById(employeeId)
    if (!employee) return notFound(new InvalidParamError('employeeId'))

    const isAllowed = company.id === employee.companyId
    if (!isAllowed) return unauthorized(new InvalidParamError("This employee doesn't belong to the company"))

    return ok('The recharge was successfull')
  } catch (err) {
    return serverError()
  }
}
