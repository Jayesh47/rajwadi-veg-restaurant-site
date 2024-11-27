'use client'
import api from "@/app/api";
import React, { useEffect, useState, useMemo } from "react";
import BottomDashboard from './bottomDashboard';

export default function AdminDashboard() {
    const [Content, setContent] = useState({
        totalUsers: "",
        totalOrders: "",
        totalSales: "",
        totalEmp: ""
    });
 
    const handleAdminDashboard = async () => {
        const token = sessionStorage.getItem('adminToken');
        if (token) {
            const res = await api.get("/admin-dashboard", { headers: { 'Authorization': `Bearer ${token}` } });
            const _res = res.data;
            if (_res) {
                setContent({
                    totalUsers: _res["totalUsers"],
                    totalOrders: _res["totalOrders"],
                    totalSales: _res["totalSales"],
                    totalEmp: _res["totalEmployee"]
                });
            }
        }
    }
    useEffect(() => {
        handleAdminDashboard();
    }, []);
    const totalCount = useMemo(() => {
        const total = Number(Content.totalUsers);
        const totalEmp = Content.totalEmp;
        const totalOrders = Content.totalOrders;
        const totalSales = Content.totalSales;
        if (total === 0) return "No Users Found!"
        else return [total, totalEmp, totalOrders, totalSales];
    }, [Content.totalUsers, Content.totalEmp, Content.totalOrders, Content.totalSales]);
    return (
        <main className="flex-1 p-6 h-[98vh] overflow-y-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-100 text-shadow">Dashboard</h1>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-white shadow-lg shadow-gray-600 rounded-lg p-4">
                    <h3 className="font-semibold text-lg">Total Customers</h3>
                    <p className="text-2xl font-bold">{totalCount[0]}</p>
                </div>

                <div className="bg-white shadow-lg shadow-gray-600 rounded-lg p-4">
                    <h3 className="font-semibold text-lg">Active Orders</h3>
                    <p className="text-2xl font-bold">{totalCount[2]}</p>
                </div>

                <div className="bg-white shadow-lg shadow-gray-600 rounded-lg p-4">
                    <h3 className="font-semibold text-lg">Total Sales</h3>
                    <p className="text-2xl font-bold">₹{totalCount[3]}</p>
                </div>

                <div className="bg-white shadow-lg shadow-gray-600 rounded-lg p-4">
                    <h3 className="font-semibold text-lg">Total Employees</h3>
                    <p className="text-2xl font-bold">{totalCount[1]}</p>
                </div>
            </section>
            <BottomDashboard />
        </main>
    )
}
