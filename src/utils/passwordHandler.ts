import bcrypt from 'bcrypt'

export const createHashPassword = (password: string): string => {
  return bcrypt.hashSync(password, 10)
}
