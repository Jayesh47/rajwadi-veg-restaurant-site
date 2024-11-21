import React from 'react';
import api from '@/app/api';
import {toast} from 'react-hot-toast';

interface User {
    userId?: string;
}

export default function Confirm({userId}: User) {
    const handleConfirm = async () => {
        const isconfirm = confirm("are you sure to confirm this booking?");
        if (isconfirm) {
            const data = {isConfirm: "confirm", userid: userId};
            const res = await api.put("/confirm-booking", data);
            if (res.data["message"] === "success") {
                toast.success("Booking is confirmed.");
            }else {
                toast.error("Something went wrong! try to pay to developer");
            }
        }
    }
    return (
        <span className="w-fit">
            <button className="w-fit overflow-auto no-scrollbar hover:text-blue-500 underline mr-3" onClick={handleConfirm}>
                Confirm
            </button>
        </span>
    );
}
