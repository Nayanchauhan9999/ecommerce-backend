var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        trim: true,
        minlength: [8, "Password should be atleast 8 characters"],
    },
    confirmPassword: {
        type: String,
        required: [true, "Please enter confirm password"],
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    tokens: [
        {
            token: {
                type: String,
            },
        },
    ],
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified("password")) {
            this.password = yield bcrypt.hash(this.password, 12);
            this.confirmPassword = yield bcrypt.hash(this.confirmPassword, 12);
        }
        next();
    });
});
userSchema.method("generateAuthToken", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "2h"
        });
        this.tokens = this.tokens.concat({ token: token }).slice(-5);
        yield this.save();
        return token;
    });
});
const UserModal = model("user", userSchema);
export default UserModal;
