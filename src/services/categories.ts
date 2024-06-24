import categoriesModel from '../models/categories'
import Categories from '../types/categories'

export const fetchCategories = async () => {
  return await categoriesModel.find().populate('parentCategory')
}

export const fetchcategoriesById = async (id: string) => {
  return await categoriesModel.findById(id)
}

export const createcategory = async (data: Categories) => {
  const result = new categoriesModel(data)
  await result.save()
  return result
}

export const updatecategory = async (id: string, data: Categories) => {
  const result = await categoriesModel.findByIdAndUpdate(id, data, {
    new: true,
  })
  return result
}

export const deletecategory = async (id: string) => {
  await categoriesModel.findByIdAndDelete(id)
}
