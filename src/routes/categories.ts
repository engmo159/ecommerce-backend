import { Router, Request, Response } from 'express'
import {
  fetchCategories,
  deletecategory,
  fetchcategoriesById,
  createcategory,
  updatecategory,
} from '../services/categories'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    const data = await fetchCategories()
    res.status(200).json(data)
  } catch (err: any) {
    res.status(500).json({ error: err?.message })
  }
})
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const data = await fetchcategoriesById(id)
    res.status(200).json(data)
  } catch (err: any) {
    res.status(500).json({ error: err?.message })
  }
})

router.post('/', async (req: Request, res: Response) => {
  try {
    const newCategory = await createcategory(req.body)
    res.status(200).json(newCategory)
  } catch (err: any) {
    res.status(400).json({ error: err?.message })
  }
})

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const updatedCategory = await updatecategory(id, req.body)
    res.status(200).json(updatedCategory)
  } catch (err: any) {
    res.status(400).json({ error: err?.message })
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const updatedCategory = await deletecategory(id)
    res.status(200).json(updatedCategory)
  } catch (err: any) {
    res.status(400).json({ error: err?.message })
  }
})

export default router
