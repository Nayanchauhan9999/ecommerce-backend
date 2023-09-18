//external library imports
import express from "express";
import chalk from "chalk";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

//personal imports
import {
  categoryRoutes,
  homeRoutes,
  signinRoutes,
  signupRoutes,
  userRoutes,
  productRoutes,
} from "./src/Routes/index.js";
import dbConnection from "./src/utils/database/index.js";
import { validateReqBody, validateToken } from "./src/middleware/index.js";

const app = express();
const PORT = 8080 || process.env.PORT;

// --------------------------- import ends ------------------------------

// ------------------- middleware starts ------------------------------

app.use(express.json());
app.use(cookieParser());
const corsConfig = {
  origin: "https://shoping-karlo.vercel.app",
  credentials: true,
};
app.use(cors(corsConfig));
// app.use(cors());

// ------------------- middleware starts ------------------------------

// app.options("", cors(corsConfig));

dbConnection();

app.use("/api/v1", [validateReqBody], homeRoutes);
app.use("/api/v1/auth/signup", [validateReqBody], signupRoutes);
app.use("/api/v1/auth/signin", [validateReqBody], signinRoutes);
app.use("/api/v1/users", [validateReqBody], validateToken, userRoutes);
app.use("/api/v1/categories", [validateReqBody], categoryRoutes);
app.use("/api/v1/products", [validateReqBody], productRoutes);

app.listen(PORT, () => {
  console.log(
    `server started ${chalk.yellow("http://localhost:" + PORT + "/api/v1")}`
  );
});

export default app;
