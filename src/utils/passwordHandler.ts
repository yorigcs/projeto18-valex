import bcrypt from 'bcrypt'

export const createHashPassword = (password: string): string => {
  return bcrypt.hashSync(password, 10)
}

export const compareHashPassword = (password: string, hashedPassword: string): boolean => {
  return bcrypt.compareSync(password, hashedPassword)
}
