import Category from "../../models/category.model.js";

export const categoryList = async () => {
  try {
    const categories = await Category.find();
    return categories;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const categoryById = async (parent: any, { id }: { id: string }) => {
  try {
    const category = await Category.findById(id);
    return category;
  } catch (error) {
    console.log(error);
    return error;
  }
};
