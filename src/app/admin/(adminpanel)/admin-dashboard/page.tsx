'use client'
import api from "@/app/api";
import React, {useEffect, useState, useMemo} from "react";

export default function AdminDashboard() {
    const [Content, setContent] = useState({
        totalUsers: "",
    });
    const handleAdminDashboard = async () => {
        const token = sessionStorage.getItem('adminToken');
        if (token) {
            const res = await api.get("/admin-dashboard", {headers: {'Authorization': `Bearer ${token}`}});
            const _res = res.data;
            if (_res) {
                setContent({
                    totalUsers: _res["totalUsers"]
                });
            }
        }
    }
    useEffect(() => {
        handleAdminDashboard();
    }, []);
    const customerDetails = useMemo(() => {
        const total = Number(Content.totalUsers);
        if (total === 0) return "No Users Found!"
        else return total;
    }, [Content.totalUsers]);
    return (
        <main className="flex-1 p-6 h-[98vh] overflow-y-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-100 text-shadow">Dashboard</h1>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-white shadow-lg shadow-gray-600 rounded-lg p-4">
                    <h3 className="font-semibold text-lg">Total Customers</h3>
                    <p className="text-2xl font-bold">{customerDetails}</p>
                </div>

                <div className="bg-white shadow-lg shadow-gray-600 rounded-lg p-4">
                    <h3 className="font-semibold text-lg">Active Orders</h3>
                    <p className="text-2xl font-bold">567</p>
                </div>

                <div className="bg-white shadow-lg shadow-gray-600 rounded-lg p-4">
                    <h3 className="font-semibold text-lg">Total Sales</h3>
                    <p className="text-2xl font-bold">₹1,23,456</p>
                </div>

                <div className="bg-white shadow-lg shadow-gray-600 rounded-lg p-4">
                    <h3 className="font-semibold text-lg">Feedback</h3>
                    <p className="text-2xl font-bold">89</p>
                </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white shadow-lg shadow-gray-600 rounded-lg p-6">
                    <h3 className="font-semibold text-xl mb-4">Recent Orders</h3>
                    <ul className="space-y-3">
                        <li className="flex justify-between">
                            <span>Order #1234</span>
                            <span className="text-green-500">Completed</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Order #5678</span>
                            <span className="text-yellow-500">Pending</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Order #91011</span>
                            <span className="text-red-500">Cancelled</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-white shadow-lg shadow-gray-600 rounded-lg p-6">
                    <h3 className="font-semibold  text-xl mb-4">Recent Reservations</h3>
                    <ul className="space-y-3">
                        <li>
                            <span className="block">jayesh - Booked Dining Table</span>
                            <span className="text-sm text-gray-500">2 hours ago</span>
                        </li>
                        <li>
                            <span className="block">User Jane Doe placed an order</span>
                            <span className="text-sm text-gray-500">5 hours ago</span>
                        </li>
                        <li>
                            <span className="block">User Sam Smith updated profile</span>
                            <span className="text-sm text-gray-500">1 day ago</span>
                        </li>
                    </ul>
                </div>
            </section>
        </main>
    )
}
