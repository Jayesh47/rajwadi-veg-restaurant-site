import mongoose from 'mongoose';
import ModelConnection from '@/app/apis/lib/connection';

ModelConnection();

const OrderSchema = new mongoose.Schema({
    customerId: { type: String },
    productName: { type: String },
    productPrice: { type: String },
    productQty: { type: String },
    TotalBill: { type: String },
    customerUPI: { type: String },
    paymentStatus: { type: String, default: "completed" },
    orderStatus: { type: String, default: "pending", elum: ["pending", "completed"] },
    createAt: { type: Date, default: Date.now() }
});
const Order = mongoose.models.orders || mongoose.model('orders', OrderSchema);
export default Order;