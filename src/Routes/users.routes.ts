import express from "express";
import { getUsers, getUser, updateUser } from "../Controllers/users.controller";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.patch("/:id", updateUser);

export default router;