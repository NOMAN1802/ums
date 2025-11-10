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
// Add this BEFORE your routes
app.use(cors({
  origin: [
    'http://localhost:5173', // for local development
    'http://10.110.122.244',
    'http://ums.com',
 
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range']
}));

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
