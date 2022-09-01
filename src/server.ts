import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { routeCards } from './routes'

dotenv.config()
const server = express()
const PORT = process.env.PORT

server.use([cors(), express.json(), routeCards])
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
