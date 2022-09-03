import { findByApiKey } from '../repositories/companyRepository'
import { findById } from '../repositories/employeeRepository'
import { findByTypeAndEmployeeId, TransactionTypes, CardInsertData, insert } from '../repositories/cardRepository'
import { badRequest, notFound, serverError, unauthorized, created } from '../helpers/httpHelper'
import { InvalidParamError } from '../errors'
import { HttpResponse } from '../protocols'
import generator from '../utils/generateRandom'
import { encrypter } from '../utils/cryptrHandler'
import { generateExpDate } from '../utils/generateDate'
import generateName from '../utils/generateName'

export const createCardService = async (apiKey: string, employeeID: number, type: TransactionTypes): Promise<HttpResponse> => {
  try {
    const company = await findByApiKey(apiKey)
    if (!company) return notFound(new InvalidParamError('x-api-key'))

    const employee = await findById(employeeID)
    if (!employee) return notFound(new InvalidParamError('employeeId'))

    const isAllowed = company.id === employee.companyId
    if (!isAllowed) return unauthorized(new InvalidParamError("This employee doesn't belong to the company"))

    const hasCardtypeRegistered = await findByTypeAndEmployeeId(type, employeeID)
    if (hasCardtypeRegistered) return badRequest(new InvalidParamError('This employee has already this card type registered'))

    const cardInfo: CardInsertData = {
      number: generator(12),
      employeeId: employeeID,
      cardholderName: generateName(employee.fullName),
      securityCode: encrypter(generator(4)),
      expirationDate: generateExpDate(),
      isVirtual: false,
      isBlocked: false,
      type

    }
    await insert(cardInfo)
    return created('created')
  } catch (err) {
    return serverError()
  }
}
