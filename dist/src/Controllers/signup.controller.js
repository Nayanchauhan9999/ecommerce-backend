var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import UserModal from "../models/user.model.js";
export const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    const errors = [];
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
        return;
    }
    if (!email.includes("@")) {
        res.json({ email: "Please enter valid email" });
        return;
    }
    if (password.length <= 7) {
        res.json({ password: "Password should be atleast 8 characters" });
        return;
    }
    if (confirmPassword !== password) {
        res.json({ message: "Password and confirm passworld does't match" });
        return;
    }
    const isUserExist = yield UserModal.findOne({ email });
    if (isUserExist) {
        res.json({ email: "Email already registered" });
        return;
    }
    const newUser = new UserModal({
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
    });
    const createdUser = yield newUser.save();
    const sendResponseObject = {
        id: createdUser.id,
        firstName: createdUser === null || createdUser === void 0 ? void 0 : createdUser.firstName,
        lastName: createdUser === null || createdUser === void 0 ? void 0 : createdUser.lastName,
        email: createdUser === null || createdUser === void 0 ? void 0 : createdUser.email,
    };
    res.status(201).json(sendResponseObject);
});
