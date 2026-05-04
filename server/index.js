import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json())

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server on port ${process.env.PORT || 5000}`)
})