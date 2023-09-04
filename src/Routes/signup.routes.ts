import express from "express";
import { createUser } from "../Controllers/signup.controller.js";
import { validateReqBody } from "../middleware/index.js";

const router = express.Router();
router.post("/",validateReqBody, createUser);

export default router;

