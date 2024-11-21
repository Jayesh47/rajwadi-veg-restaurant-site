import mongoose from 'mongoose';
import ModelConnection from './connection';

ModelConnection();

const CartSchema = new mongoose.Schema({
    _productId: {type: String},
    _productName: {type: String},
    _productPrice: {type: String},
    _productImg: {type: String},
    _customerId: {type: String},
    _createAt: {type: Date, default: Date.now()}
});
const Cart = mongoose.models.ProductCart || mongoose.model('ProductCart', CartSchema);
export default Cart;