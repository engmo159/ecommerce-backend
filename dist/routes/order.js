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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_1 = require("../services/order");
const router = (0, express_1.Router)();
router.post('/checkout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, eMail, city, postalCode, streetAddress, country, cartProducts, } = req.body;
        const session = yield (0, order_1.postCartInfos)(name, eMail, city, postalCode, streetAddress, country, cartProducts);
        // Log the entire request body
        res.json({ url: session.url });
    }
    catch (err) {
        res.status(400).json({ error: err === null || err === void 0 ? void 0 : err.message });
    }
}));
exports.default = router;
