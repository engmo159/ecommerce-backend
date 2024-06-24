"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categoriesSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    parentCategory: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'categories',
        required: false,
    },
    properties: {
        type: [
            {
                name: { type: String, required: true },
                values: { type: [String], required: true },
            },
        ],
        default: [],
    },
}, { versionKey: false, timestamps: true });
const categoriesModel = mongoose_1.models.categories || (0, mongoose_1.model)('categories', categoriesSchema);
exports.default = categoriesModel;
