import mongoose, { Types } from 'mongoose'
import productsModel from '../models/products'
import Products from '../types/products'

export const fetchproducts = async () => {
  return await productsModel.find({}, null, { sort: { _id: -1 } })
}
export const findCartProducts = async (ids: string) => {
  return await productsModel.find({ _id: ids })
}
export const fetchSortedProducts = async () => {
  return await productsModel.find({}, null, { sort: { _id: -1 }, limit: 20 })
}

export const fetchproductsById = async (id: string) => {
  return await productsModel.findById(id)
}

export const createproduct = async (data: Products) => {
  const result = new productsModel(data)
  await result.save()
  return result
}

export const updateproduct = async (id: string, data: Products) => {
  const result = await productsModel.findByIdAndUpdate(id, data, {
    new: true,
  })
  return result
}

export const deleteproduct = async (id: string) => {
  await productsModel.findByIdAndDelete(id)
}
