import { singOutUser } from "../Controllers/signout.controller.js";
import express from "express";
const Router = express.Router();
Router.get("/", singOutUser);
export default Router;
