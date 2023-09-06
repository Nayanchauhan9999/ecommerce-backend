import { Request, Response } from "express";
import Product from "../models/product.modal";

//method : GET ::: path : /api/v1/products ::: info : get all products, login not required
export const getProducts = async (req: Request, res: Response) => {
  try {
    const getAllProducts = await Product.find();
    res.status(200).send(getAllProducts);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//method : GET ::: path : /api/v1/products/:id ::: info : get a product, login not required
export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).send(product);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//method : POST ::: path : /api/v1/products ::: info : create a product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(200).send(product);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//method : PATCH ::: path : /api/v1/products/:id ::: info : update a product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );
    res.status(200).send(product);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//method : DELETE ::: path : /api/v1/products/:id ::: info : delete a product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).send(product);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
