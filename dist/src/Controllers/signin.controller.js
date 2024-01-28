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
import bcrypt from "bcrypt";
import UserModal from "../models/user.model.js";
import { transporter } from "../utils/smtp/nodemailer.js";
export var signinUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, findUser, comparePassword, token, sendResponseObject, mail, error_1;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                if (!email) {
                    res.json({ message: "Please enter you email" });
                    return [2 /*return*/];
                }
                if (!password) {
                    res.json({ message: "Please enter you password" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, UserModal.findOne({ email: email })];
            case 1:
                findUser = _c.sent();
                if (!findUser) {
                    res.json({ message: "Email not registered" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bcrypt.compare(password, findUser.password)];
            case 2:
                comparePassword = _c.sent();
                if (!comparePassword) {
                    res.status(400).json({ message: "Email or password does't match" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, findUser.generateAuthToken()];
            case 3:
                token = _c.sent();
                //set domain for cookies
                res.cookie("jwt", token, {
                    //token expires in 1 hour
                    expires: new Date(Date.now() + 1000 * 60 * 60),
                    sameSite: "none",
                    secure: true,
                    httpOnly: true,
                });
                sendResponseObject = {
                    id: findUser === null || findUser === void 0 ? void 0 : findUser.id,
                    email: findUser === null || findUser === void 0 ? void 0 : findUser.email,
                    token: (_b = findUser === null || findUser === void 0 ? void 0 : findUser.tokens[findUser.tokens.length - 1]) === null || _b === void 0 ? void 0 : _b.token,
                };
                _c.label = 4;
            case 4:
                _c.trys.push([4, 6, , 7]);
                return [4 /*yield*/, transporter.sendMail({
                        from: "Ethereal Email <nayanchauhan9999@gmail.com>",
                        to: "nayan chauhan <roxane8@ethereal.email>",
                        subject: "Hello ✔ hi",
                        text: "Hello world?",
                        html: "<b>Hello world? how are you?</b>",
                    })];
            case 5:
                mail = _c.sent();
                return [3 /*break*/, 7];
            case 6:
                error_1 = _c.sent();
                console.log(error_1);
                return [3 /*break*/, 7];
            case 7:
                res.send(sendResponseObject);
                return [2 /*return*/];
        }
    });
}); };
