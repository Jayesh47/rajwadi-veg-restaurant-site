'use client';
import React, { useState, useEffect } from 'react';
import api from '@/app/api';
import OrderBtn from './orderStatus';
import {Toaster} from 'react-hot-toast';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useRouter} from 'next/navigation';

interface Order {
    orderId: string;
    customerId: string;
    customerOrder: string[]; 
    status: string;
    totalPays: number;
    date: string;
}

export default function ManageOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const route = useRouter();

    const handleOrders = () => {
        api.get('/view-customer-orders')
            .then((res) => {
                const _res = res.data;
                setOrders(_res.message);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        handleOrders();
    }, []);

    return (
        <main className="p-6 min-h-screen">
            <Toaster />
            <h1 className="text-3xl font-bold mb-6 text-white">Manage Orders</h1>

            <button onClick={() => route.refresh()} className="text-white"><FontAwesomeIcon icon={faRefresh} /></button>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2">Order ID</th>
                            <th className="px-4 py-2">Customer ID</th>
                            <th className="px-4 py-2">Items</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Total</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.orderId} className="border-b text-center">
                                <td className="px-4 py-2 max-w-40 no-scroll overflow-x-auto">{order.orderId}</td>
                                <td className="px-4 py-2 max-w-40 no-scroll overflow-x-auto">{order.customerId}</td>
                                <td className="px-4 py-2 max-h-24 flex overflow-y-auto">
                                    {Array.isArray(order.customerOrder)
                                        ? order.customerOrder.join(', ')
                                        : 'No items'}
                                </td>
                                <td className="px-4 py-2">
                                    <span
                                        className={`text-lg rounded-lg font-semibold ${
                                            order.status === 'pending'
                                                ? 'text-blue-600'
                                                : order.status === 'completed'
                                                ? 'text-green-500'
                                                : 'bg-red-300 text-red-900'
                                        }`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-4 py-2">{order.totalPays}</td>
                                <td className="px-4 py-2">{formatDateTime(order.date)}</td>
                                <td className="px-4 py-2">
                                    <OrderBtn _customerId={order.customerId} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}

function formatDateTime(dateString: string) {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };

    const formattedDateTime = date
        .toLocaleString('en-GB', options)
        .replace(',', ''); 

    return formattedDateTime;
}
