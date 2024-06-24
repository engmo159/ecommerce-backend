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
const categories_1 = require("../services/categories");
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, categories_1.fetchCategories)();
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).json({ error: err === null || err === void 0 ? void 0 : err.message });
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield (0, categories_1.fetchcategoriesById)(id);
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).json({ error: err === null || err === void 0 ? void 0 : err.message });
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCategory = yield (0, categories_1.createcategory)(req.body);
        res.status(200).json(newCategory);
    }
    catch (err) {
        res.status(400).json({ error: err === null || err === void 0 ? void 0 : err.message });
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedCategory = yield (0, categories_1.updatecategory)(id, req.body);
        res.status(200).json(updatedCategory);
    }
    catch (err) {
        res.status(400).json({ error: err === null || err === void 0 ? void 0 : err.message });
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedCategory = yield (0, categories_1.deletecategory)(id);
        res.status(200).json(updatedCategory);
    }
    catch (err) {
        res.status(400).json({ error: err === null || err === void 0 ? void 0 : err.message });
    }
}));
exports.default = router;
