var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Category from "../../models/category.model.js";
export const categoryList = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield Category.find();
        return categories;
    }
    catch (error) {
        console.log(error);
        return error;
    }
});
export const categoryById = (parent, { id }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Category.findById(id);
        return category;
    }
    catch (error) {
        console.log(error);
        return error;
    }
});
