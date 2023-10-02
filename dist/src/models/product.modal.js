import mongoose from "mongoose";
var productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    categories: {
        type: Array,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    policy: {
        type: Array,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    Reviews: {
        type: Array,
        required: true,
    },
    sizes: {
        type: Array,
    },
    tags: {
        required: true,
        type: Array,
    },
    colors: { type: Array, required: true },
    images: {
        type: Array,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    brand: {
        type: String,
        trim: true,
    },
    brandLogo: {
        type: String,
        trim: true,
    },
});
var Product = mongoose.model("Product", productSchema);
export default Product;
