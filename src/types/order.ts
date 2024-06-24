import { Document } from 'mongoose'

interface Order extends Document {
  line_items: object
  name: string
  eMail: string
  city: string
  postalCode: string
  streetAddress: string
  country: string

  paid: { type: boolean }
  quantity: number
  price_data: object
  currency: string
  unit_amount: number
  products: string[]
}

export default Order
