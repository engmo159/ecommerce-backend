import mongoose from 'mongoose'
import productsModel from '../models/products'
import orderModel from '../models/order'

const stripe = require('stripe')(process.env.STRIPE_SK)

export const postCartInfos = async (
  name: string,
  eMail: string,
  city: string,
  postalCode: string,
  streetAddress: string,
  country: string,
  cartProducts: string[]
) => {
  try {
    // Convert comma-separated string to an array of product IDs
    const productsIds = cartProducts
    // Remove duplicate values and filter out undefined values
    const uniqueIds = [...new Set(productsIds)]

    // Convert each productId to a valid ObjectId
    const objectIdIds = uniqueIds
      .map(id => {
        try {
          return new mongoose.Types.ObjectId(id)
        } catch (error) {
          console.error(`Invalid ObjectId: ${id}`)
          return null
        }
      })
      .filter(id => id)

    // Find products based on unique _id values
    const productsInfos = await productsModel.find({
      _id: { $in: objectIdIds },
    })
    if (productsInfos.length === 0) {
      throw new Error('No product information found for the given IDs.')
    }

    let line_items = []

    for (const productId of uniqueIds) {
      const productInfo = productsInfos.find(
        p => p._id.toString() === productId
      )

      const quantity =
        productsIds.filter((id: string) => id === productId)?.length || 0

      if (quantity > 0 && productInfo) {
        line_items.push({
          quantity: quantity,
          price_data: {
            currency: 'USD',
            product_data: { name: productInfo.title },
            unit_amount: productInfo.price * 100,
          },
        })
      }
    }
    const orderDoc = await orderModel.create({
      line_items,
      name,
      eMail,
      city,
      postalCode,
      streetAddress,
      country,
      paid: false,
    })

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      customer_email: eMail,
      success_url: process.env.PUPLIC_URL + '/cart?success=1',
      cancel_url: process.env.PUPLIC_URL + '/cart?canceled=1',
      metadata: { orderId: orderDoc._id.toString() },
    })
    return session
  } catch (error: any) {
    // Handle database query errors
    console.error('Error fetching product information:', error.message)
    throw error // Re-throw the error to be handled by the calling function
  }
}
