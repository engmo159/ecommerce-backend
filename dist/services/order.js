"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCartInfos = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const products_1 = __importDefault(require("../models/products"));
const order_1 = __importDefault(require("../models/order"));
const stripe = require('stripe')(process.env.STRIPE_SK);
const postCartInfos = (name, eMail, city, postalCode, streetAddress, country, cartProducts) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Convert comma-separated string to an array of product IDs
        const productsIds = cartProducts;
        // Remove duplicate values and filter out undefined values
        const uniqueIds = [...new Set(productsIds)];
        // Convert each productId to a valid ObjectId
        const objectIdIds = uniqueIds
            .map(id => {
            try {
                return new mongoose_1.default.Types.ObjectId(id);
            }
            catch (error) {
                console.error(`Invalid ObjectId: ${id}`);
                return null;
            }
        })
            .filter(id => id);
        // Find products based on unique _id values
        const productsInfos = yield products_1.default.find({
            _id: { $in: objectIdIds },
        });
        if (productsInfos.length === 0) {
            throw new Error('No product information found for the given IDs.');
        }
        let line_items = [];
        for (const productId of uniqueIds) {
            const productInfo = productsInfos.find(p => p._id.toString() === productId);
            const quantity = ((_a = productsIds.filter((id) => id === productId)) === null || _a === void 0 ? void 0 : _a.length) || 0;
            if (quantity > 0 && productInfo) {
                line_items.push({
                    quantity: quantity,
                    price_data: {
                        currency: 'USD',
                        product_data: { name: productInfo.title },
                        unit_amount: productInfo.price * 100,
                    },
                });
            }
        }
        const orderDoc = yield order_1.default.create({
            line_items,
            name,
            eMail,
            city,
            postalCode,
            streetAddress,
            country,
            paid: false,
        });
        const session = yield stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            customer_email: eMail,
            success_url: process.env.PUPLIC_URL + '/cart?success=1',
            cancel_url: process.env.PUPLIC_URL + '/cart?canceled=1',
            metadata: { orderId: orderDoc._id.toString() },
        });
        return session;
    }
    catch (error) {
        // Handle database query errors
        console.error('Error fetching product information:', error.message);
        throw error; // Re-throw the error to be handled by the calling function
    }
});
exports.postCartInfos = postCartInfos;
