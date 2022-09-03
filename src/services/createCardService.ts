import { findByApiKey } from '../repositories/companyRepository'
import { findById } from '../repositories/employeeRepository'
import { findByTypeAndEmployeeId, TransactionTypes, CardInsertData, insert } from '../repositories/cardRepository'
import { BadRequest, NotFound, Unauthorized } from '../errors'
import generator from '../utils/generateRandom'
import { encrypter } from '../utils/cryptrHandler'
import { generateExpDate } from '../utils/generateDate'
import generateName from '../utils/generateName'

export const createCardService = async (apiKey: string, employeeID: number, type: TransactionTypes): Promise<void> => {
  const company = await findByApiKey(apiKey)
  if (!company) throw new NotFound('company')

  const employee = await findById(employeeID)
  if (!employee) throw new NotFound('employee')

  const isAllowed = company.id === employee.companyId
  if (!isAllowed) throw new Unauthorized("This employee doesn't belong to the company")

  const hasCardtypeRegistered = await findByTypeAndEmployeeId(type, employeeID)
  if (hasCardtypeRegistered) throw new BadRequest('This employee has already this card type registered')

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
}
