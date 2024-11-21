import React from "react";
import AddNewEmployee from "./add-employee";

export default function ViewEmployees() {

    return (
        <main className="p-6 min-h-screen">
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
                        <tr className="border-b">
                            <td className="px-4 py-2 font-bold">1</td>
                            <td className="px-4 py-2">John Doe</td>
                            <td className="px-4 py-2">Chef</td>
                            <td className="px-4 py-2">john@example.com</td>
                            <td className="px-4 py-2">25000</td>
                            <td className="px-4 py-2">
                                <button className="text-blue-600 hover:underline mr-3">Edit</button>
                                <button className="text-red-600 hover:underline">Delete</button>
                            </td>
                        </tr>
                        <tr className="border-b">
                            <td className="px-4 py-2 font-bold">2</td>
                            <td className="px-4 py-2">Jane Smith</td>
                            <td className="px-4 py-2">Waiter</td>
                            <td className="px-4 py-2">jane@example.com</td>
                            <td className="px-4 py-2">25000</td>
                            <td className="px-4 py-2">
                                <button className="text-blue-600 hover:underline mr-3">Edit</button>
                                <button className="text-red-600 hover:underline">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>
    )
}