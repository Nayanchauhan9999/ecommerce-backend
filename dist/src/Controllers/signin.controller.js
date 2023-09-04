var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from "bcrypt";
import UserModal from "../models/user.model";
export const signinUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email) {
        res.json({ message: "Please enter you email" });
        return;
    }
    if (!password) {
        res.json({ message: "Please enter you password" });
        return;
    }
    const findUser = yield UserModal.findOne({ email });
    if (!findUser) {
        res.json({ message: "Email not registered" });
        return;
    }
    const comparePassword = yield bcrypt.compare(password, findUser.password);
    if (!comparePassword) {
        res.status(400).json({ message: "Email or password does't match" });
        return;
    }
    const token = yield findUser.generateAuthToken();
    res.cookie("jwt", token, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 2),
        httpOnly: true,
    });
    const sendResponseObject = {
        id: findUser.id,
        email: findUser === null || findUser === void 0 ? void 0 : findUser.email,
        token: findUser.tokens[findUser.tokens.length - 1].token,
    };
    res.send(sendResponseObject);
});
