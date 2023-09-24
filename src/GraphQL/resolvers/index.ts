import { categoryById, categoryList, usersList } from "../service/index.js";

export const resolver = {
  Query: {
    productList: usersList,
    categoryList: categoryList,
    categoryById: categoryById,
  },
};
