import { Request, Response } from "express";
import Category from "../models/category.model.js";
import { ICategory } from "../utils/Types/index.js";

//method : GET ::: get all category list ::: path - /api/v1/categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    const getAllCategories = await Category.find();
    res.status(200).send(getAllCategories);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//method : GET ::: get single category ::: path - /api/v1/category/:id
export const getCategory = async (req: Request, res: Response) => {
  try {
    const getCategory = await Category.findById(req.params.id);
    if (!getCategory) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    res.status(200).send(getCategory);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//method : POST ::: create category ::: path - /api/v1/category
export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = new Category(req.body);

    const isCategoryExist = await Category.findOne({ name: req.body.name });

    if (isCategoryExist) {
      res.status(400).json({ message: "Category already created" });
      return;
    }
    category.save();
    res.status(201).send(category);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//method : PATCH ::: update category ::: path - /api/v1/category/:id
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const isNameAlreadyExist: ICategory | null = await Category.findOne({
      name: req.body.name,
    });
    if (isNameAlreadyExist) {
      res.status(400).json({ message: "Category name already available" });
      return;
    }
    const updatedCategory = await Category.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );
    if (!updatedCategory) {
      res.status(404).json({ message: "Category Not Found" });
    }
    res.status(200).send(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//method : DELETE ::: delete category ::: path - /api/v1/category/:id
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete({
      _id: req.params.id,
    });

    //if id receive but wrong id : [null]
    if (!deletedCategory) {
      res.status(400).json({ message: "Category Not found" });
      return;
    }

    res.status(200).send(deletedCategory);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
