import { connection } from '../database'
import { mapObjectToUpdateQuery } from '../utils/sqlUtils'

export type TransactionTypes =
  | 'groceries'
  | 'restaurant'
  | 'transport'
  | 'education'
  | 'health'

export interface Card {
  id: number
  employeeId: number
  number: string
  cardholderName: string
  securityCode: string
  expirationDate: string
  password?: string
  isVirtual: boolean
  originalCardId?: number
  isBlocked: boolean
  type: TransactionTypes
}

export type CardInsertData = Omit<Card, 'id'>
export type CardUpdateData = Partial<Card>

export async function findCardsByEmployeeId (employeeId: number): Promise<Card []> {
  const result = await connection.query<Card, [number]>('SELECT * FROM cards WHERE "employeeId"= $1', [employeeId])
  return result.rows
}

export async function findById (id: number): Promise<Card> {
  const result = await connection.query<Card, [number]>(
    'SELECT * FROM cards WHERE id=$1',
    [id]
  )

  return result.rows[0]
}

export async function findByTypeAndEmployeeId (
  type: TransactionTypes,
  employeeId: number
): Promise<Card> {
  const result = await connection.query<Card, [TransactionTypes, number]>(
    'SELECT * FROM cards WHERE type=$1 AND "employeeId"=$2',
    [type, employeeId]
  )

  return result.rows[0]
}

export async function findByCardDetails (
  number: string,
  cardholderName: string,
  expirationDate: string
): Promise<Card> {
  const result = await connection.query<Card, [string, string, string]>(
    ` SELECT 
        * 
      FROM cards 
      WHERE number=$1 AND "cardholderName"=$2 AND "expirationDate"=$3`,
    [number, cardholderName, expirationDate]
  )

  return result.rows[0]
}

export async function insert (cardData: CardInsertData): Promise<void> {
  const {
    employeeId,
    number,
    cardholderName,
    securityCode,
    expirationDate,
    password,
    isVirtual,
    originalCardId,
    isBlocked,
    type
  } = cardData

  await connection.query(
    `
    INSERT INTO cards ("employeeId", number, "cardholderName", "securityCode",
      "expirationDate", password, "isVirtual", "originalCardId", "isBlocked", type)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  `,
    [
      employeeId,
      number,
      cardholderName,
      securityCode,
      expirationDate,
      password,
      isVirtual,
      originalCardId,
      isBlocked,
      type
    ]
  )
}

export async function update (id: number, cardData: CardUpdateData): Promise<void> {
  const { objectColumns: cardColumns, objectValues: cardValues } =
    mapObjectToUpdateQuery({
      object: cardData,
      offset: 2
    })

  await connection.query(
    `
    UPDATE cards
      SET ${cardColumns}
    WHERE $1=id
  `,
    [id, ...cardValues]
  )
}

export async function remove (id: number): Promise<void> {
  await connection.query<any, [number]>('DELETE FROM cards WHERE id=$1', [id])
}

interface Balance {
  paymentBalance: number
  rechargeBalance: number
}
export async function cardBalance (cardId: number): Promise<Balance> {
  const result = await connection.query<Balance, [number]>(
  `
  SELECT  SUM(p.amount ) AS "paymentBalance", 
  (SELECT SUM(r.amount) FROM recharges r WHERE r."cardId"= $1) AS "rechargeBalance"
  FROM payments p 
  WHERE p."cardId" = $1
`, [cardId])

  return result.rows[0]
}
