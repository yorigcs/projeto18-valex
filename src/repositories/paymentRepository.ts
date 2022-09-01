import { connection } from '../database.js'

export interface Payment {
  id: number
  cardId: number
  businessId: number
  timestamp: Date
  amount: number
}
export type PaymentWithBusinessName = Payment & { businessName: string }
export type PaymentInsertData = Omit<Payment, 'id' | 'timestamp'>

export async function findByCardId (cardId: number): Promise<Payment []> {
  const result = await connection.query<PaymentWithBusinessName, [number]>(
    `SELECT 
      payments.*,
      businesses.name as "businessName"
     FROM payments 
      JOIN businesses ON businesses.id=payments."businessId"
     WHERE "cardId"=$1
    `,
    [cardId]
  )

  return result.rows
}

export async function insert (paymentData: PaymentInsertData): Promise<void> {
  const { cardId, businessId, amount } = paymentData

  await connection.query<any, [number, number, number]>(
    'INSERT INTO payments ("cardId", "businessId", amount) VALUES ($1, $2, $3)',
    [cardId, businessId, amount]
  )
}