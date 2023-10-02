import { singOutUser } from "../Controllers/signout.controller.js";
import express from "express";
var Router = express.Router();
Router.get("/", singOutUser);
export default Router;
