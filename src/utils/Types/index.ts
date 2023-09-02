import { Date, Document, Model, ObjectId } from "mongoose";

export type TokenTypes = {
  token: string;
  _id: ObjectId;
};

export interface IUser extends Document {
  email: string;
  password: string;
  confirmPassword: string;
  createdAt: Date;
  tokens: TokenTypes[];
}

export interface IUserMethods {
  generateAuthToken(): string;
}

export type UserModalTypes = Model<IUser, {}, IUserMethods>;
