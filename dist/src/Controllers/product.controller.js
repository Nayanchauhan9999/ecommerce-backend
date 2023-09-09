var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Product from "../models/product.modal.js";
//method : GET ::: path : /api/v1/products ::: info : get all products, login not required
export const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllProducts = yield Product.find();
        res.status(200).send(getAllProducts);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
//method : GET ::: path : /api/v1/products/:id ::: info : get a product, login not required
export const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product.findById(req.params.id);
        res.status(200).send(product);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
//method : POST ::: path : /api/v1/products ::: info : create a product
export const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = new Product(req.body);
        yield product.save();
        res.status(200).send(product);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
//method : PATCH ::: path : /api/v1/products/:id ::: info : update a product
export const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product.findByIdAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
        });
        res.status(200).json({ message: "Product updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
//method : DELETE ::: path : /api/v1/products/:id ::: info : delete a product
export const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product.findByIdAndDelete(req.params.id);
        res.status(200).send(product);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
