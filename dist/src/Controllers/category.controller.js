var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Category from "../models/category.model.js";
//method : GET ::: get all category list ::: path - /api/v1/categories
export const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllCategories = yield Category.find();
        res.status(200).send(getAllCategories);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
//method : GET ::: get single category ::: path - /api/v1/category/:id
export const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getCategory = yield Category.findById(req.params.id);
        if (!getCategory) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        res.status(200).send(getCategory);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
//method : POST ::: create category ::: path - /api/v1/category
export const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = new Category(req.body);
        const isCategoryExist = yield Category.findOne({ name: req.body.name });
        if (isCategoryExist) {
            res.status(400).json({ message: "Category already created" });
            return;
        }
        category.save();
        res.status(201).send(category);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
//method : PATCH ::: update category ::: path - /api/v1/category/:id
export const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isNameAlreadyExist = yield Category.findOne({
            name: req.body.name,
        });
        if (isNameAlreadyExist) {
            res.status(400).json({ message: "Category name already available" });
            return;
        }
        const updatedCategory = yield Category.findByIdAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
        });
        if (!updatedCategory) {
            res.status(404).json({ message: "Category Not Found" });
        }
        res.status(200).json({ message: "Category Updated Successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
//method : DELETE ::: delete category ::: path - /api/v1/category/:id
export const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedCategory = yield Category.findByIdAndDelete({
            _id: req.params.id,
        });
        //if id receive but wrong id : [null]
        if (!deletedCategory) {
            res.status(400).json({ message: "Category Not found" });
            return;
        }
        res.status(200).send(deletedCategory);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
