import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'
import productsRoutes from './routes/products'
import categoriesRouters from './routes/categories'
import orderRouters from './routes/order'
import stripeRouters from './routes/webhook'
const app = express()
const port = process.env.PORT || 3000

// parse application/json

app.use(cors())
// to correct unicode data from form in client side
app.use(express.json())

// DB Connection (database name: e-commerce)
mongoose
  .connect(process.env.MONGODB_URL || '')
  .then(() => console.log('Connected to DB!'))
  .catch(err => console.log('Connection Error!', err))

// Routers
app.use('/products', productsRoutes)
app.use('/categories', categoriesRouters)
app.use('/order', orderRouters)
app.use('/webhook', stripeRouters)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
