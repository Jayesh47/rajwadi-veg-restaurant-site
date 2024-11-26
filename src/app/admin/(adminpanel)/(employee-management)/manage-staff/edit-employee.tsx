import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import api from '@/app/api';
import { toast, Toaster } from 'react-hot-toast';


interface empId { employeeId?: string }

export default function EditButton({ employeeId }: empId) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [empName, setEmpName] = useState("");
    const [empSalary, setSalary] = useState("");
    const [empRole, setRole] = useState("");
    const [empEmail, setEmail] = useState('');
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        api.put("/update-employee-details", {
            employeeName: empName,
            employeeSalary: empSalary,
            employeeRole: empRole,
            employeeEmail: empEmail,
            employeeId: employeeId
        }).then(res => {
            const _res = res.data;
            if (_res["message"] === "success") {
                toast.success("Detials updated successfully.");
            }
        }).catch(err => console.log(err));
    }
    return (
        <>
            <button onClick={() => setModalOpen(true)} className="text-blue-600 hover:underline mr-3">Edit</button>
            <form method='post' onSubmit={handleSubmit} className={`flex flex-col w-1/4 h-4/5 font-semibold absolute bg-blue-800 p-2 right-0 bottom-0 transition-transform ${isModalOpen ? "-translate-y-[0%]" : "-translate-y-[-100%]"}`}>
                <span className='flex justify-between mb-3 text-white border-b-2'>
                    <h1 className='text-xl py-2'>Edit Employee</h1>
                    <FontAwesomeIcon icon={faTimes} onClick={() => setModalOpen(false)} className='text-xl cursor-pointer' />
                </span>
                <input type="text" name="employee-name" placeholder='Employee Name' className='py-2 outline-blue-400 px-3 my-2' onChange={(e) => setEmpName(e.target.value)} />
                <select name="role" className='py-2 px-3 my-2 outline-blue-400' onChange={(e) => setRole(e.target.value)}>
                    <option value="">--- Choose Role ---</option>
                    <option value="chef">Chef</option>
                    <option value="manager">Manager</option>
                    <option value="receptionist">Receptionist</option>
                </select>
                <input type="email" name="employee-email" placeholder='Employee Email' className='py-2 outline-blue-400 px-3 my-2' onChange={(e) => setEmail(e.target.value)} />
                <input type="number" name="salary" placeholder='Employee Salary' className='py-2 outline-blue-400 px-3 my-2' onChange={(e) => setSalary(e.target.value)} />
                <button type="submit" className='mt-3 font-bold text-xl bg-gray-300'>Update</button>
            </form>
        </>
    )
}