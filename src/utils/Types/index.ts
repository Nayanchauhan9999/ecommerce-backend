import { Date, Document, Model, ObjectId } from "mongoose";

export type TokenTypes = {
  token: string;
  _id: ObjectId;
};

export interface IUser extends Document {
  firstName: string;
  lastName: string;
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


//category

export interface ICategory extends Document{
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}