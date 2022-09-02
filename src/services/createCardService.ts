import { findByApiKey } from '../repositories/companyRepository'
import { findById } from '../repositories/employeeRepository'
import { NotFound, Unauthorized } from '../errors'
export const createCardService = async (apiKey: string, employeeID: number): Promise<void> => {
  const company = await findByApiKey(apiKey)
  if (!company) throw new NotFound('company')

  const employee = await findById(employeeID)
  if (!employee) throw new NotFound('employee')

  const isAllowed = company.id === employee.companyId
  if (!isAllowed) throw new Unauthorized("This employee doesn't belong to the company")
}
