import mongoose from 'mongoose';
import ModelConnection from '@/app/apis/lib/connection';
ModelConnection();


const EmployeeSchema = new mongoose.Schema({
    employeeName: {type: String},
    employeeEmail: {type: String},
    employeeSalary: {type: String},
    employeeRole: {type: String},
    joiningDate: {type: Date, default: Date.now()}
});
const Employee = mongoose.models.Employees || mongoose.model("Employees", EmployeeSchema);
export default Employee;