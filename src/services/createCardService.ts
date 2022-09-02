import { findByApiKey } from '../repositories/companyRepository'
import { findById } from '../repositories/employeeRepository'
import { NotFound } from '../errors'
export const createCardService = async (apiKey: string, employeeID: number): Promise<void> => {
  const company = await findByApiKey(apiKey)
  if (!company) throw new NotFound('company')

  const employee = await findById(employeeID)
  if (!employee) throw new NotFound('employee')
}
