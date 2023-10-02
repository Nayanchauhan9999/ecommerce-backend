var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//external library imports
import express from "express";
import chalk from "chalk";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
//personal imports
import { categoryRoutes, homeRoutes, signinRoutes, signupRoutes, userRoutes, productRoutes, signoutRoutes, } from "./src/Routes/index.js";
import dbConnection from "./src/utils/database/index.js";
import { validateReqBody, validateToken } from "./src/middleware/index.js";
import { resolver } from "./src/GraphQL/resolvers/index.js";
import { typesGraphQl } from "./src/GraphQL/schema/index.js";
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault, } from "@apollo/server/plugin/landingPage/default";
var app = express();
var startServer = function () { return __awaiter(void 0, void 0, void 0, function () {
    var graphQlServer, PORT, allowDomains, corsConfig;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                graphQlServer = new ApolloServer({
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
                PORT = 8080 || process.env.PORT;
                // --------------------------- import ends ------------------------------
                // ------------------- middleware starts ------------------------------
                app.use(express.json());
                app.use(cookieParser());
                allowDomains = [
                    "https://shoping-karlo.vercel.app",
                    "http://localhost:3000",
                ];
                corsConfig = {
                    origin: allowDomains,
                    credentials: true,
                };
                app.use(cors(corsConfig));
                // app.use(cors());
                // ------------------- middleware ends ------------------------------
                // app.options("", cors(corsConfig));
                return [4 /*yield*/, graphQlServer.start()];
            case 1:
                // app.use(cors());
                // ------------------- middleware ends ------------------------------
                // app.options("", cors(corsConfig));
                _a.sent();
                console.log("".concat(chalk.magentaBright("GraphQL Server :" + " http://localhost:" + PORT + "/api/v1/graphql")));
                dbConnection();
                app.use("/api/v1", [validateReqBody], homeRoutes);
                app.use("/api/v1/auth/signup", [validateReqBody], signupRoutes);
                app.use("/api/v1/auth/signin", [validateReqBody], signinRoutes);
                app.use("/api/v1/auth/signout", [validateReqBody], signoutRoutes);
                app.use("/api/v1/users", [validateReqBody], validateToken, userRoutes);
                app.use("/api/v1/categories", [validateReqBody], categoryRoutes);
                app.use("/api/v1/products", [validateReqBody], productRoutes);
                app.use("/api/v1/graphql", expressMiddleware(graphQlServer));
                app.listen(PORT, function () {
                    console.log("server started ".concat(chalk.yellow("http://localhost:" + PORT + "/api/v1")));
                });
                return [2 /*return*/];
        }
    });
}); };
startServer();
export default app;
