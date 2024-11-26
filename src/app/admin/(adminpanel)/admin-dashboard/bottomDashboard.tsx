import api from '@/app/api';
import { useState, useEffect } from 'react';

export default function BottomDashboard() {
    const [orders, setOrders] = useState({
        complete: "",
        pending: "",
        reserve: []
    });
    const _date = new Date();
    const handleOrders = () => {
        api.get("/total-recent-orders").then(res => {
            setOrders({
                complete: res.data["completed"],
                pending: res.data["pending"],
                reserve: res.data["reservation"]
            });
        }).catch(err => console.log(err));
    }
    useEffect(() => {
        handleOrders();
        console.log(orders["reserve"]);
    }, []);
    return (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white shadow-lg shadow-gray-600 rounded-lg p-6">
                <h3 className="font-semibold text-xl mb-4">Recent Orders</h3>
                <ul className="space-y-3">
                    <li className="flex justify-between">
                        <span>Order #{orders["complete"]}</span>
                        <span className="text-green-500">Completed</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Order #{orders["pending"]}</span>
                        <span className="text-yellow-500">Pending</span>
                    </li>
                    <li className="flex justify-between">
                        <h1 className="">This data is From {'01' + "/" + _date.getMonth() + "/" + _date.getFullYear()} to {_date.getDate() + "/" + _date.getMonth() + "/" + _date.getFullYear()}</h1>
                    </li>
                </ul>
            </div>

            <div className="bg-white shadow-lg shadow-gray-600 rounded-lg p-6">
                <h3 className="font-semibold  text-xl mb-4">Recent Reservations</h3>
                <ul className="space-y-3">
                    {
                        orders["reserve"].map((order, i) => (
                            <li key={i}>
                                <span className="block">{order["customerName"]} - {order["reservationType"]}</span>
                                <span className="text-sm text-gray-500">{order["reservationTime"]}</span>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </section>
    )
}