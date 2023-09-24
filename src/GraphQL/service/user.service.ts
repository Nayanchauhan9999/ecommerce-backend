import Product from "../../models/product.modal.js";

export const usersList = async () => {
  try {
    const productList = await Product.find();
    return productList;
  } catch (error) {
    console.log(error);
    return error;
  }
};
