import React from 'react';
import api from '@/app/api';
import {toast} from 'react-hot-toast';

export default function Rejection({userId}:{userId:String}) {
    const handleRejection = async () => {
        const _confirm = confirm("Warning: Are you sure to reject this booking.");
        if (_confirm) {
            const data = {isConfirm: "Reject", userid: userId}
            const res = await api.put("/confirm-booking", data);
            if (res.data["message"] === "success") {
                toast.success('Booking is Rejected Successfully.');
            }
        }
    }
    return (
        <span>
            <button className='max-w-1/5 overflow-auto no-scrollbar hover:text-red-500 underline' onClick={() => handleRejection()}>Reject</button>
        </span>
    )
}