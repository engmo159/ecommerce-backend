import mongoose, { Schema, model, models } from 'mongoose'
import Order from '../types/order'

const orderSchema = new Schema<Order>(
  {
    line_items: Object,
    name: String,
    eMail: String,
    city: String,
    postalCode: String,
    streetAddress: String,
    country: String,
    quantity: { type: Number },
    price_data: Object,
    currency: { type: String },
    paid: { type: Boolean },
  },
  { versionKey: false, timestamps: true }
)

const orderModel = models.order || model('order', orderSchema)

export default orderModel
