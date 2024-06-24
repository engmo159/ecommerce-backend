import { Router, Request, Response } from 'express'

import { postCartInfos } from '../services/order'

const router = Router()

router.post('/checkout', async (req: Request, res: Response) => {
  try {
    const {
      name,
      eMail,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    } = req.body

    const session = await postCartInfos(
      name,
      eMail,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts
    )
    // Log the entire request body

    res.json({ url: session.url })
  } catch (err: any) {
    res.status(400).json({ error: err?.message })
  }
})

export default router
