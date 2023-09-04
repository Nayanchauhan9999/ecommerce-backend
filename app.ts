import express from "express";
import chalk from "chalk";
import cookieParser from "cookie-parser";
import {
  categoryRoutes,
  homeRoutes,
  signinRoutes,
  signupRoutes,
  userRoutes,
} from "./src/Routes";
import dbConnection from "./src/utils/database";
import "dotenv/config";
import validateToken from "./src/middleware/validateToken";

const app = express();
const PORT = 8080 || process.env.PORT;
app.use(express.json());
app.use(cookieParser());
dbConnection();

app.use("/api/v1", homeRoutes);
app.use("/api/v1/auth/signup", signupRoutes);
app.use("/api/v1/auth/signin", signinRoutes);
app.use("/api/v1/users", validateToken, userRoutes);
app.use("/api/v1/categories",categoryRoutes)

app.listen(PORT, () => {
  console.log(
    `server started ${chalk.yellow("http://localhost:" + PORT + "/api/v1")}`
  );
});

export default app;