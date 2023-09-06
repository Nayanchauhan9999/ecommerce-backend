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

export interface ICategory extends Document {
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

//product types

export interface IProduct {
  title: string;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  rating: number;
  categories: ICategory[];
  images: string[] | string;
  quantity: number;
  Reviews: string[] | string;
  tags: string[];
  colors?: string[] | string;
  policy?: string[] | string;
  sizes?: string[] | string;
  brand?: string;
  brandLogo?: string;
}
