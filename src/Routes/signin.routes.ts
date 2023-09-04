import express from "express";
import { signinUser } from "../Controllers/signin.controller.js";
import { validateReqBody } from "../middleware/index.js";

const router = express.Router();

router.post("/",validateReqBody, signinUser)

export default router;