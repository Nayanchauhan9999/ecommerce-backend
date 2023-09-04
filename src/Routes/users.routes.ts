import express from "express";
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../Controllers/users.controller";
import { validateId, validateReqBody } from "../middleware";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", validateId, getUser);
router.patch("/:id", [validateId, validateReqBody], updateUser);
router.delete("/:id", validateId, deleteUser);

export default router;
