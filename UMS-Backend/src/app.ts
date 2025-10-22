import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import globalErrorHandler from './app/middlewares/globalErrorhandler'
import notFound from './app/middlewares/notFound'
import router from './app/routes'
import cookieParser from 'cookie-parser'

const app: Application = express()

//parsers
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: [
      'https://universitymanagemnet.vercel.app',
      'http://localhost:5173',
    ],
    credentials: true,
  })
)

// application routes
app.use('/api/v1', router)

// Test Route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome University Management Server..')
})

//Not Found
app.use(notFound)

// Global Error Handler
app.use(globalErrorHandler)

export default app
