import Cryptr from 'cryptr'
import dotenv from 'dotenv'
dotenv.config()
const HASH = process.env.CRYPTER_HASH || 'sha@1a565'
const crypter = new Cryptr(HASH)

export const encrypter = (key: string): string => {
  return crypter.encrypt(key)
}
export const decrypter = (key: string): string => {
  return crypter.decrypt(key)
}
