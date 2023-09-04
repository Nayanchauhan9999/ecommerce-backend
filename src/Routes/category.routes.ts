import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../Controllers/category.controller";
import { validateId, validateReqBody } from "../middleware";

const router = Router();

router.get("/", getCategories);
router.post("/", validateReqBody, createCategory);
router.get("/:id", validateId, getCategory);
router.patch("/:id", [validateId, validateReqBody], updateCategory);
router.delete("/:id", validateId, deleteCategory);

export default router;