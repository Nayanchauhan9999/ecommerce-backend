//external library imports
import express from "express";
import chalk from "chalk";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

//personal imports
import {
  categoryRoutes,
  homeRoutes,
  signinRoutes,
  signupRoutes,
  userRoutes,
  productRoutes,
  signoutRoutes,
} from "./src/Routes/index.js";
import dbConnection from "./src/utils/database/index.js";
import { validateReqBody, validateToken } from "./src/middleware/index.js";
import { resolver } from "./src/GraphQL/resolvers/index.js";
import { typesGraphQl } from "./src/GraphQL/schema/index.js";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";

const app = express();
const startServer = async () => {
  const graphQlServer = new ApolloServer({
    typeDefs: typesGraphQl,
    resolvers: resolver,
    plugins: [
      // Install a landing page plugin based on NODE_ENV
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageProductionDefault({
            graphRef: "my-graph-id@my-graph-variant",
            footer: false,
          })
        : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
    ],
  });
  const PORT = 8080 || process.env.PORT;

  // --------------------------- import ends ------------------------------

  // ------------------- middleware starts ------------------------------

  app.use(express.json());
  app.use(cookieParser());

  const allowDomains = [
    "https://shoping-karlo.vercel.app",
    "http://localhost:3000",
  ];
  const corsConfig = {
    origin: allowDomains,
    credentials: true,
  };
  app.use(cors(corsConfig));
  // app.use(cors());

  // ------------------- middleware ends ------------------------------

  // app.options("", cors(corsConfig));
  await graphQlServer.start();
  console.log(
    `${chalk.magentaBright(
      "GraphQL Server :" + " http://localhost:" + PORT + "/api/v1/graphql"
    )}`
  );
  dbConnection();

  app.use("/api/v1", [validateReqBody], homeRoutes);
  app.use("/api/v1/auth/signup", [validateReqBody], signupRoutes);
  app.use("/api/v1/auth/signin", [validateReqBody], signinRoutes);
  app.use("/api/v1/auth/signout", [validateReqBody], signoutRoutes);
  app.use("/api/v1/users", [validateReqBody], validateToken, userRoutes);
  app.use("/api/v1/categories", [validateReqBody], categoryRoutes);
  app.use("/api/v1/products", [validateReqBody], productRoutes);
  app.use("/api/v1/graphql", expressMiddleware(graphQlServer));

  app.listen(PORT, () => {
    console.log(
      `server started ${chalk.yellow("http://localhost:" + PORT + "/api/v1")}`
    );
  });
};

startServer();

export default app;
