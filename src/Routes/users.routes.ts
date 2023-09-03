import express from "express";
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../Controllers/users.controller";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
