import { homeController } from "../Controllers/home.controller.js";
import express from "express";

const router = express.Router();

router.get("/", homeController);

export default router;
