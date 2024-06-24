import { Schema, model, models } from 'mongoose'

import Categories from '../types/categories'

const categoriesSchema = new Schema<Categories>(
  {
    name: { type: String, required: true },
    parentCategory: {
      type: Schema.Types.ObjectId,
      ref: 'categories',
      required: false,
    },
    properties: {
      type: [
        {
          name: { type: String, required: true },
          values: { type: [String], required: true },
        },
      ],
      default: [],
    },
  },
  { versionKey: false, timestamps: true }
)

const categoriesModel =
  models.categories || model<Categories>('categories', categoriesSchema)

export default categoriesModel
