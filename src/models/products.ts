import { Schema, model, models } from 'mongoose'
import Products from '../types/products'

const productsSchema = new Schema<Products>(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'categories',
      required: true,
    },
    productProperties: { type: Object },
    imageUrl: { type: [String] },
  },
  { versionKey: false, timestamps: true }
)

const productsModel = models.products || model('products', productsSchema)

export default productsModel
