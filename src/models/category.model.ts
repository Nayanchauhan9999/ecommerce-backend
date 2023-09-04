import mongoose, { Schema } from "mongoose";
import { ICategory } from "../utils/Types/index.js";

const categorySchema: Schema<ICategory> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Category = mongoose.model<ICategory>("Category", categorySchema);

export default Category;
