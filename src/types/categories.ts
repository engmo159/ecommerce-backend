import { Document } from 'mongoose'
interface Property {
  name: string
  values: string[]
}
interface Categories extends Document {
  name: string
  parentCategory?: string
  properties?: Property[]
}
export default Categories
