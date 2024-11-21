'use client'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

export default function AddNewEmployee() {
    const [isModalOpen, setModalOpen] = useState(false);
    return (
        <div>
            <button className="bg-gray-200 font-semibold w-32 py-1 shadow-lg mb-6" onClick={() => setModalOpen(true)}>
                Add New Staff
            </button>
            <form method='post' className={`flex flex-col w-1/4 h-4/5 font-semibold absolute bg-black p-2 right-0 bottom-0 transition-transform ${isModalOpen ? "-translate-y-[0%]": "-translate-y-[-100%]"}`}>
                <span className='flex justify-between mb-3 text-white border-b-2'>
                    <h1 className='text-xl py-2'>Add New Employee</h1>
                    <FontAwesomeIcon icon={faTimes} onClick={() => setModalOpen(false)} className='text-xl cursor-pointer' />
                </span>
                <input type="text" name="employee-name" placeholder='Employee Name' className='py-2 px-3 my-2' />
                <select name="role" className='py-2 px-3 my-2'>
                    <option value="">--- Choose Role ---</option>
                    <option value="">Chef</option>
                    <option value="">Waiter</option>
                    <option value="">Manager</option>
                    <option value="">Receptionist</option>
                    <option value="">Security Guard</option>
                </select>
                <input type="email" name="employee-email" placeholder='Employee Email' className='py-2 px-3 my-2' />
                <input type="number" name="salary" placeholder='Employee Salary' className='py-2 px-3 my-2' />
                <button type="submit" className='mt-3 font-bold text-xl bg-gray-300'>Join</button>
            </form>
        </div>
    )
}