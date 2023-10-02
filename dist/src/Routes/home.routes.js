import { homeController } from "../Controllers/home.controller.js";
import express from "express";
var router = express.Router();
router.get("/", homeController);
export default router;
