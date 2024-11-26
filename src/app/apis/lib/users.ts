import mongoose from 'mongoose';
const datetime = new Date(Date.now())

const UserSchema = new mongoose.Schema({
    username: {type: String},
    email: {type: String},
    password: {type: String},
    role: {
        type: String,
        enum: ['customer', 'admin', 'sub-admin'],
        default: "customer"
    },
    createdAt: {type: String, default: datetime.toLocaleString()},
    updatedAt: {type: String, default: datetime.toLocaleString()}
});
const Users = mongoose.models.users || mongoose.model('users', UserSchema);
export default Users;