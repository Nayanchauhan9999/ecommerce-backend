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
import UserModal from "../models/user.model.js";
export var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, confirmPassword, firstName, lastName, errors, isUserExist, newUser, createdUser, sendResponseObject;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password, confirmPassword = _a.confirmPassword, firstName = _a.firstName, lastName = _a.lastName;
                errors = [];
                if (!firstName) {
                    errors.push("Please enter your first Name");
                }
                if (!lastName) {
                    errors.push("Please enter your Last Name");
                }
                if (!email) {
                    errors.push("Please enter your email");
                }
                if (!password) {
                    errors.push("Please enter Password");
                }
                if (!confirmPassword) {
                    errors.push("Please enter confirm Password");
                }
                if (!firstName || !lastName || !email || !password || !confirmPassword) {
                    res.status(400).json({ message: errors });
                    return [2 /*return*/];
                }
                if (!email.includes("@")) {
                    res.json({ email: "Please enter valid email" });
                    return [2 /*return*/];
                }
                if (password.length <= 7) {
                    res.json({ password: "Password should be atleast 8 characters" });
                    return [2 /*return*/];
                }
                if (confirmPassword !== password) {
                    res.json({ message: "Password and confirm passworld does't match" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, UserModal.findOne({ email: email })];
            case 1:
                isUserExist = _b.sent();
                if (isUserExist) {
                    res.json({ email: "Email already registered" });
                    return [2 /*return*/];
                }
                newUser = new UserModal({
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword,
                    firstName: firstName,
                    lastName: lastName,
                });
                return [4 /*yield*/, newUser.save()];
            case 2:
                createdUser = _b.sent();
                sendResponseObject = {
                    id: createdUser.id,
                    firstName: createdUser === null || createdUser === void 0 ? void 0 : createdUser.firstName,
                    lastName: createdUser === null || createdUser === void 0 ? void 0 : createdUser.lastName,
                    email: createdUser === null || createdUser === void 0 ? void 0 : createdUser.email,
                };
                res.status(201).json(sendResponseObject);
                return [2 /*return*/];
        }
    });
}); };
