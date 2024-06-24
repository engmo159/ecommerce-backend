import { Router, Request, Response } from 'express'
import {
  createproduct,
  deleteproduct,
  fetchSortedProducts,
  fetchproducts,
  fetchproductsById,
  findCartProducts,
  updateproduct,
} from '../services/products'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    const data = await fetchproducts()
    res.status(200).json(data)
  } catch (err: any) {
    res.status(500).json({ error: err?.message })
  }
})
router.get('/sorted', async (req: Request, res: Response) => {
  try {
    const data = await fetchSortedProducts()
    res.status(200).json(data)
  } catch (err: any) {
    res.status(500).json({ error: err?.message })
  }
})

router.post('/cartIds', async (req: Request, res: Response) => {
  try {
    const cartProducts = await findCartProducts(req.body.ids)
    res.status(200).json(cartProducts)
  } catch (err: any) {
    res.status(400).json({ error: err?.message })
  }
})

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const data = await fetchproductsById(id)
    res.status(200).json(data)
  } catch (err: any) {
    res.status(500).json({ error: err?.message })
  }
})

router.post('/', async (req: Request, res: Response) => {
  try {
    console.log(req)
    const newCategory = await createproduct(req.body)
    res.status(200).json(newCategory)
  } catch (err: any) {
    res.status(400).json({ error: err?.message })
  }
})

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const updatedCategory = await updateproduct(id, req.body)
    res.status(200).json(updatedCategory)
  } catch (err: any) {
    res.status(400).json({ error: err?.message })
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const updatedCategory = await deleteproduct(id)
    res.status(200).json(updatedCategory)
  } catch (err: any) {
    res.status(400).json({ error: err?.message })
  }
})

export default router
