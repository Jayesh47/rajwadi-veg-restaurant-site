'use client'
import React, { useState } from "react";
interface Order {
    id: number;
    customer: string;
    items: string;
    status: 'Pending' | 'Completed' | 'Cancelled';
    total: string;
    date: string;
}

export default function ManageOrders() {
    const [showModal, setShowModal] = useState(false);

    const orders = [
        {
            id: 1,
            customer: "John Doe",
            items: "Veg Pizza, Garlic Bread",
            status: "Pending",
            total: "₹600",
            date: "2024-10-01",
        },
        {
            id: 2,
            customer: "Jane Smith",
            items: "Pasta, Salad",
            status: "Completed",
            total: "₹450",
            date: "2024-10-02",
        },
        {
            id: 3,
            customer: "Mike Tyson",
            items: "Burger, Fries, Soda",
            status: "Cancelled",
            total: "₹300",
            date: "2024-10-03",
        },
    ];
    return (
        <main className="p-6 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-white">Manage Orders</h1>

            {/* Orders Table */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2">Order ID</th>
                            <th className="px-4 py-2">Customer</th>
                            <th className="px-4 py-2">Items</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Total</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="border-b text-center">
                                <td className="px-4 py-2">{order.id}</td>
                                <td className="px-4 py-2">{order.customer}</td>
                                <td className="px-4 py-2">{order.items}</td>
                                <td className="px-4 py-2">
                                    <span
                                        className={`px-3 py-1 rounded-lg text-sm font-semibold ${order.status === "Pending"
                                            ? "bg-yellow-300 text-yellow-900"
                                            : order.status === "Completed"
                                                ? "bg-green-300 text-green-900"
                                                : "bg-red-300 text-red-900"
                                            }`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-4 py-2">{order.total}</td>
                                <td className="px-4 py-2">{order.date}</td>
                                <td className="px-4 py-2">
                                    <button className="text-blue-600 hover:underline mr-3">
                                        Edit
                                    </button>
                                    <button className="text-red-600 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
