"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const products_1 = __importDefault(require("./routes/products"));
const categories_1 = __importDefault(require("./routes/categories"));
const order_1 = __importDefault(require("./routes/order"));
const webhook_1 = __importDefault(require("./routes/webhook"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// parse application/json
app.use((0, cors_1.default)());
// to corect unicode data from form in client side
app.use(express_1.default.json());
// DB Connection (database name: e-commerce)
mongoose_1.default
    .connect(process.env.MONGODB_URL || '')
    .then(() => console.log('Connected to DB!'))
    .catch(err => console.log('Connection Error!', err));
// Routers
app.use('/products', products_1.default);
app.use('/categories', categories_1.default);
app.use('/order', order_1.default);
app.use('/webhook', webhook_1.default);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
//new
// const express = require('express')
// const app = express()
// const cors = require('cors')
// const bodyParser = require('body-parser')
// const stripe = require('stripe')('sk_test_J...')
// import productsRoutes from './routes/products'
// import categoriesRouters from './routes/categories'
// import orderRouters from './routes/order'
// const endpointSecret =
//   'whsec_184996b15dcee447f3b9290557ab7e3c8b34f89a3f2c74cab09fd19689c8d37d.'
// const port = 3005
// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
// // parse application/json
// app.use(
//   bodyParser.json({
//     verify: (req: any, res: any, buf: any) => {
//       req.rawBody = buf
//     },
//   })
// )
// app.use(cors())
// app.post('/webhooks', (req: any, res: any) => {
//   const sig = req.headers['stripe-signature']
//   let event
//   try {
//     event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret)
//   } catch (err: any) {
//     return res.status(400).send(`Webhook Error: ${err.message}`)
//   }
//   // Handle the event
//   switch (event.type) {
//     case 'payment_intent.succeeded':
//       const paymentIntentSucceeded = event.data.object
//       // Then define and call a function to handle the event payment_intent.succeeded
//       break
//     // ... handle other event types
//     default:
//       console.log(`Unhandled event type ${event.type}`)
//   }
//   // Return a 200 response to acknowledge receipt of the event
//   res.json({ received: true })
// }) / // Routers
//   app.use('/products', productsRoutes)
// app.use('/categories', categoriesRouters)
// app.use('/order', orderRouters)
// // app.use('/webhook', stripeRouters)
// app.listen(port, () => console.log(`Example app listening on port ${port}!`))
