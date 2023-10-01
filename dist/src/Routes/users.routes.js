import express from "express";
import { getUsers, getUser, updateUser, deleteUser} from "../Controllers/users.controller.js";
import { validateId, validateReqBody } from "../middleware/index.js";
const router = express.Router();
router.get("/", getUsers);
router.get("/:id", validateId, getUser);
router.patch("/:id", [validateId, validateReqBody], updateUser);
router.delete("/:id", validateId, deleteUser);
export default router;
