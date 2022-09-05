import dotenv from 'dotenv'
import pg from 'pg'
dotenv.config()

const mod = process.env.mod

const deployConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
}

const devConfig = {
  connectionString: process.env.DATABASE_URL

}

const { Pool } = pg
export const connection = new Pool(mod === 'deploy' ? deployConfig : devConfig)
