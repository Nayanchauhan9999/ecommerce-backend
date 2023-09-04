import { Schema, model } from "mongoose";
import { IUser, IUserMethods, UserModalTypes } from "../utils/Types/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema: Schema<IUser, UserModalTypes, IUserMethods> = new Schema({
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

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = await bcrypt.hash(this.confirmPassword, 12);
  }
  next();
});

userSchema.method("generateAuthToken", async function (): Promise<string> {
  const token: string = jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn:"2h"
  });
  this.tokens = this.tokens.concat({ token: token }).slice(-5);
  await this.save();
  return token;
});

const UserModal = model<IUser, UserModalTypes>("user", userSchema);

export default UserModal;
