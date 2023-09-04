import express from "express";
import { createUser } from "../Controllers/signup.controller";
import { validateReqBody } from "../middleware";
const router = express.Router();
router.post("/", validateReqBody, createUser);
export default router;
