import express from "express";
import { signinUser } from "../Controllers/signin.controller";

const router = express.Router();

router.post("/", signinUser)

export default router;