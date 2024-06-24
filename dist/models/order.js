"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    line_items: Object,
    name: String,
    eMail: String,
    city: String,
    postalCode: String,
    streetAddress: String,
    country: String,
    quantity: { type: Number },
    price_data: Object,
    currency: { type: String },
    paid: { type: Boolean },
}, { versionKey: false, timestamps: true });
const orderModel = mongoose_1.models.order || (0, mongoose_1.model)('order', orderSchema);
exports.default = orderModel;
