import express from "express";
import chalk from "chalk";
import cookieParser from "cookie-parser";
import {
  categoryRoutes,
  homeRoutes,
  signinRoutes,
  signupRoutes,
  userRoutes,
  productRoutes
} from "./src/Routes/index.js";

import dbConnection from "./src/utils/database/index.js";
import "dotenv/config";
import validateToken from "./src/middleware/validateToken.js";
import cors from "cors";

const app = express();
const PORT = 8080 || process.env.PORT;
app.use(express.json());
app.use(cookieParser());

const corsConfig = {
  origin: "",
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE"],
};
app.use(cors(corsConfig));
app.options("", cors(corsConfig));

dbConnection();

app.use("/api/v1", homeRoutes);
app.use("/api/v1/auth/signup", signupRoutes);
app.use("/api/v1/auth/signin", signinRoutes);
app.use("/api/v1/users", validateToken, userRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/products", productRoutes);

app.listen(PORT, () => {
  console.log(
    `server started ${chalk.yellow("http://localhost:" + PORT + "/api/v1")}`
  );
});

export default app;
