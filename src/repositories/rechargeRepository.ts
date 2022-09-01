import { connection } from '../database.js'

export interface Recharge {
  id: number
  cardId: number
  timestamp: Date
  amount: number
}
export type RechargeInsertData = Omit<Recharge, 'id' | 'timestamp'>

export async function findByCardId (cardId: number): Promise<Recharge []> {
  const result = await connection.query<Recharge, [number]>(
    'SELECT * FROM recharges WHERE "cardId"=$1',
    [cardId]
  )

  return result.rows
}

export async function insert (rechargeData: RechargeInsertData): Promise<void> {
  const { cardId, amount } = rechargeData

  await connection.query<any, [number, number]>(
    'INSERT INTO recharges ("cardId", amount) VALUES ($1, $2)',
    [cardId, amount]
  )
}