'use client';
import React, { useState, useEffect, useMemo } from 'react';
import FetchReservation from './fetchReservation';
import { toast, Toaster } from 'react-hot-toast';
import CancelBooking from './cancelBooking';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

export default function UserReservation() {
    const [reserve, setReserve] = useState([]);
    const routes = useRouter();
    useEffect(() => {
        FetchReservation().then((res) => {
            setReserve(res['message']);
        }).catch((err) => toast.error("Sorry, Something Went Wrong!"));
    }, []);
    const totalReservation = useMemo(() => reserve, [reserve]);
    const handleRefresh = () => {
        routes.refresh();
    }
    return (
        <section className='relative'>
            <Toaster />
            <h1 className='text-3xl my-5 text-center font-semibold'>All Reservations</h1>
            <button onClick={handleRefresh} className='inline-block ml-64 bg-blue-500 px-3 py-1 rounded-2xl text-white cursor-pointer'><FontAwesomeIcon icon={faRefresh} className='transition-translate easy hover:-rotate-[300deg]' /> Refresh</button>
            <div className="flex justify-around flex-wrap">
                {
                    totalReservation.length > 0 ? (
                        totalReservation.map((_data) => (
                            <div className="flex flex-col p-3 shadow-xl w-fit h-fit mx-4 my-8 md:m-8 leading-8 transtion delay-150 duration-300 easy-in-out hover:-translate-y-1 md:hover:scale-110" key={_data["_id"]}>
                                <div className="flex justify-between items-center">
                                    <h3 className='font-bold text-2xl mb-3'>{_data["customerName"]}</h3>
                                    <h3 className='font-semibold text-red-600'>Status: {_data["confirmStatus"]}</h3>
                                </div>
                                <hr />
                                <div className="grid grid-cols-2 grid-rows-5 items-center">
                                    <span className='font-semibold text-gray-400'>Booking Id: </span> <span className='font-semibold text-gray-400 overflow-auto '>{_data["_id"]}</span>
                                    <span className='font-semibold text-gray-400'>Reservation Time: </span> <span className='font-semibold text-gray-400'>{_data["reservationTime"]}</span>
                                    <span className='font-semibold text-gray-400'>Reservation Type: </span> <span className='font-semibold text-gray-400'>{_data["reservationType"]}</span>
                                    <span className='font-semibold text-gray-400'>Phone Number: </span> <span className='font-semibold text-gray-400'>{_data["customerPhone"]}</span>
                                    <span className='font-semibold text-gray-400 mr-3'>Customer Email Address: </span> <span className='font-semibold text-gray-400'>{_data["customerEmail"]}</span>
                                    <span className='font-semibold text-sm'>You're Booked On: </span> <span className='font-semibold text-sm'>{_data["createAt"]}</span>
                                </div>
                                <CancelBooking bookingId={_data["_id"]} resvTime={_data["reservationTime"]} />
                            </div>
                        ))
                    ):(<h1 className='text-2xl mb-24 font-semibold text-gray-400'>No Reservations Found!</h1>)
                }
            </div>
        </section>
    )
}