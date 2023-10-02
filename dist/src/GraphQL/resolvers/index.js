import { categoryById, categoryList, usersList } from "../service/index.js";
export var resolver = {
    Query: {
        productList: usersList,
        categoryList: categoryList,
        categoryById: categoryById,
    },
};
