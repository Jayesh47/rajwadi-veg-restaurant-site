import mongoose from 'mongoose';
import ModelConnection from './connection';

ModelConnection();
const ProductSchema = new mongoose.Schema({
    ProductName: {type: String},
    productThumbnail: {type: String},
    productPrice: {type: String},
    productDescription: {type: String},
    productDiscount: {type: String},
    productCategory: {type: String},
    createAt: {type: Date, default: Date.now()}
});
const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default Product;