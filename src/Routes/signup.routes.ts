import express from "express";
import { createUser } from "../Controllers/signup.controller";

const router = express.Router();
router.post("/", createUser);

export default router;

