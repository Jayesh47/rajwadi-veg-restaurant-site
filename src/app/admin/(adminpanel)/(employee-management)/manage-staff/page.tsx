'use client';
import React, { useEffect, useState } from "react";
import AddNewEmployee from "./add-employee";
import api from '@/app/api';
import EditButton from './edit-employee';
import RemoveBtn from './remove-employee';
import {Toaster} from 'react-hot-toast';

export default function ViewEmployees() {
    const [empData, setData] = useState([]);
    const viewEmployees = () => {
        api.get("/view-employees").then((res) => {
            const _res = res.data;
            setData(_res["message"]);
        }).catch(err => console.log(err));
    }
    useEffect(() => {
        viewEmployees();
    }, []);
    return (
        <main className="p-6 min-h-screen">
            <Toaster />
            <h1 className="text-3xl font-bold mb-6 text-gray-100">Staff Management</h1>
            <AddNewEmployee />

            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Role</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Salary</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {
                            empData.map((emp) => (
                                <tr className="border-b">
                                    <td className="px-4 py-2 font-bold">{emp["_id"]}</td>
                                    <td className="px-4 py-2">{emp["employeeName"]}</td>
                                    <td className="px-4 py-2">{emp["employeeRole"]}</td>
                                    <td className="px-4 py-2">{emp["employeeEmail"]}</td>
                                    <td className="px-4 py-2">{emp["employeeSalary"]}</td>
                                    <td className="px-4 py-2">
                                        <EditButton employeeId={emp["_id"]} />
                                        <RemoveBtn employeeId={emp["_id"]} />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </main>
    )
}