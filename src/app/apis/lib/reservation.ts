import mongoose from 'mongoose';
import ModelConnection from './connection';

ModelConnection();
const createTime = new Date(Date.now());

const ReservationSchema = new mongoose.Schema({
    reservationTime: {type: String},
    reservationType: {type: String},
    customerId: {type: String},
    customerName: {type: String},
    customerPhone: {type: String},
    customerEmail: {type: String},
    confirmStatus: {type: String, default: "pending", enum: ["pending", "confirm", "reject"]},
    createAt: {type: String, default: createTime.toLocaleString()}
});
const Reserve = mongoose.models.reservations || mongoose.model('reservations', ReservationSchema);
export default Reserve;