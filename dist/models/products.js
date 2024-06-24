"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productsSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'categories',
        required: true,
    },
    productProperties: { type: Object },
    imageUrl: { type: [String] },
}, { versionKey: false, timestamps: true });
const productsModel = mongoose_1.models.products || (0, mongoose_1.model)('products', productsSchema);
exports.default = productsModel;
