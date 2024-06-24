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
exports.deletecategory = exports.updatecategory = exports.createcategory = exports.fetchcategoriesById = exports.fetchCategories = void 0;
const categories_1 = __importDefault(require("../models/categories"));
const fetchCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield categories_1.default.find().populate('parentCategory');
});
exports.fetchCategories = fetchCategories;
const fetchcategoriesById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield categories_1.default.findById(id);
});
exports.fetchcategoriesById = fetchcategoriesById;
const createcategory = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = new categories_1.default(data);
    yield result.save();
    return result;
});
exports.createcategory = createcategory;
const updatecategory = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield categories_1.default.findByIdAndUpdate(id, data, {
        new: true,
    });
    return result;
});
exports.updatecategory = updatecategory;
const deletecategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield categories_1.default.findByIdAndDelete(id);
});
exports.deletecategory = deletecategory;
