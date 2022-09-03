
import { findById } from '../repositories/employeeRepository'
import { findCardsByEmployeeId, update } from '../repositories/cardRepository'
import { notFound, serverError, created, unauthorized, badRequest } from '../helpers/httpHelper'
import { InvalidParamError } from '../errors'
import { HttpResponse } from '../protocols'
import { decrypter } from '../utils/cryptrHandler'
import { isValidDate } from '../utils/generateDate'
import { createHashPassword } from '../utils/passwordHandler'

export const activateCardService = async (cvc: string, employeeID: number, password: string): Promise<HttpResponse> => {
  try {
    const employee = await findById(employeeID)
    if (!employee) return notFound(new InvalidParamError('employeeId'))

    const cards = await findCardsByEmployeeId(employeeID)
    if (cards.length === 0) return notFound(new InvalidParamError('You dont have any cards to activate'))

    const card = cards.filter(card => decrypter(card.securityCode) === cvc)[0]
    if (!card) return unauthorized(new InvalidParamError('cvc is wrong!'))

    if (!isValidDate(card.expirationDate)) return unauthorized(new InvalidParamError('This card expired'))

    if (card.password) return unauthorized(new InvalidParamError('This card is already activated'))

    if (password.length !== 4) return badRequest(new InvalidParamError('The password must be at least 4 characters'))

    await update(card.id, { password: createHashPassword(password) })

    return created('ok')
  } catch (err) {
    return serverError()
  }
}
