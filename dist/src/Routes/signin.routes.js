import express from "express";
import { signinUser } from "../Controllers/signin.controller";
import { validateReqBody } from "../middleware";
const router = express.Router();
router.post("/", validateReqBody, signinUser);
export default router;
