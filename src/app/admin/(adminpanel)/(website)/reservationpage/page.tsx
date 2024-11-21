'use client';
import React, { useEffect, useState } from 'react';
import api from '@/app/api';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import Confirm from './confirmation';
import {toast, Toaster} from 'react-hot-toast';
import Rejection from './reject';

export default function Reservationpage() {
    const [reserve, setReserve] = useState([]);
    const [load, setLoad] = useState("");
    const router = useRouter();
    const handleReservation = () => {
        api.post("/view-reservations").then((res) => {
            const _res = res.data;
            if (_res["message"] === null || _res["message"] === undefined) {
                setLoad("Loading, Please wait...");
            } else setLoad("");
            setReserve(_res["message"]);
        }).catch((err) => console.log(err));
    }
    useEffect(() => {
        handleReservation();
    }, []);
    const refreshPage = () => {
        router.refresh();
    }

    return (
        <section className="flex flex-col p-3">
            <Toaster />
            <h1 className='text-2xl font-semibold text-white'>Reservation Page</h1>
            <button className='text-white w-fit' onClick={() => refreshPage()}><FontAwesomeIcon icon={faRefresh} className='text-xl' /></button>
            <div className="grid grid-cols-7 text-center cursor-pointer shadow-md shadow-black/30 font-[600] bg-white mt-4 rounded p-2">
                <span className='max-w-1/5 overflow-auto no-scrollbar'>Customer Id</span>
                <span className='max-w-1/5 overflow-auto no-scrollbar'>Customer Email</span>
                <span className='max-w-1/5 overflow-auto no-scrollbar'>Phone Number</span>
                <span className='max-w-1/5 overflow-auto no-scrollbar'>Date of Booking</span>
                <span className='max-w-1/5 overflow-auto no-scrollbar'>Time of Booking</span>
                <span className='max-w-1/5 overflow-auto no-scrollbar'>Type of Booking</span>
                <span className='max-w-1/5 overflow-auto no-scrollbar'>Actions</span>
            </div>
            <div className="h-[72vh] border-b-2 border-gray-500 mt-4 overflow-auto">
                <h1 className='text-xl'>{load}</h1>
                {
                    reserve.map((_reserve) => (
                        <div className="grid grid-cols-7 text-center cursor-pointer font-[600] bg-white p-2" key={_reserve["_id"]}>
                            <span className='max-w-1/5 overflow-auto no-scrollbar'>{_reserve["_id"]}</span>
                            <span className='max-w-1/5 overflow-auto no-scrollbar'>{_reserve["customerEmail"]}</span>
                            <span className='max-w-1/5 overflow-auto no-scrollbar'>{_reserve["customerPhone"]}</span>
                            <span className='max-w-1/5 overflow-auto no-scrollbar'>{_reserve["createAt"]}</span>
                            <span className='max-w-1/5 overflow-auto no-scrollbar'>{_reserve["reservationTime"]}</span>
                            <span className='max-w-1/5 overflow-auto no-scrollbar'>{_reserve["reservationType"]}</span>
                            <span>
                                <Confirm userId={_reserve["_id"]} />
                                <Rejection userId={_reserve["_id"]} />
                            </span>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}