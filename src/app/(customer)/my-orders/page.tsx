'use client';
import React, { useState, useEffect } from 'react';
import api from '@/app/api';

export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const token = sessionStorage.getItem('userToken');
        api.get('/view-orders', { headers: { 'Authorization': `Bearer ${token}` } }).then((res) => {
            const _res = res.data;
            if (_res["message"] === "success") {
                setOrders(_res['userOrders']);
            }
        }).catch((err) => console.log(err));
    }, []);
    return (
        <section className="my-orders my-5">
            <h1 className='text-3xl text-center font-semibold '>MY ORDERS</h1>
            <div className="flex flex-col items-center flex-wrap">
                {
                    orders.length > 0 ? (
                        orders.map((order, i) => (
                            <div className="flex flex-col border-2 w-[95%] md:w-4/5 mt-6">
                                <input type="checkbox" id={`manage-site-toggle-${i}`} className="peer hidden" />
                                <label htmlFor={`manage-site-toggle-${i}`} className="cursor-pointer grid grid-cols-2 md:grid-cols-3 font-[600] items-center p-4 ">
                                    <span className='text-xl'>{order["productName"]}</span>
                                    <span className="ml-auto hidden md:block text-gray-400">{formatDateTime(order["createAt"])}</span>
                                    <span className="ml-auto text-gray-400">Show More</span>
                                </label>
                                <ul className="max-h-0 px-4 overflow-hidden grid md:grid-cols-2 md:grid-rows-2 transition-max-height duration-500 ease-in-out peer-checked:max-h-60 md:peer-checked:max-h-40">
                                    <li className='my-3 grid grid-cols-[40%_60%] md:block'><span className='md:mr-6 font-semibold'>OrderId:</span><span>{order["_id"]}</span></li>
                                    <li className='my-3 grid grid-cols-[40%_60%] md:hidden'><span className='md:mr-6 font-semibold'>Order Date:</span><span>{formatDateTime(order["createAt"])}</span></li>
                                    <li className='my-3 grid grid-cols-[40%_60%] md:block'><span className='mr-6 font-semibold'>Product Price:</span><span>₹{order["productPrice"]}</span></li>
                                    <li className='my-3 grid grid-cols-[40%_60%] md:block'><span className='mr-6 font-semibold'>GST Appied:</span><span>5.00%</span></li>
                                    <li className='my-3 grid grid-cols-[40%_60%] md:block'><span className='mr-6 font-semibold'>Total Billing:</span><span className='text-green-600'>₹{order["TotalBill"]}</span></li>
                                </ul>
                            </div>
                        ))) : (<h1 className='text-2xl font-semibold my-4 text-gray-300'>NO ORDERS FOUND!</h1>)
                }
            </div>
        </section>
    )
}
function formatDateTime(dateString :string) {
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

    const formattedDateTime = date.toLocaleString('en-GB', options).replace(',', '');

    return formattedDateTime;
}
