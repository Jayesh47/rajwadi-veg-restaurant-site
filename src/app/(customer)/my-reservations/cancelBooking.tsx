import React from 'react';
import api from '@/app/api';
import {toast} from 'react-hot-toast';

export default function CancelBooking({bookingId, resvTime}:{bookingId:String, resvTime: String}) {
    let _hide = false;
    const handleCancel = () => {
        const _confirm = confirm("Are you sure you want to cancel this booking.");
        if (_confirm) {
            api.get("/cancel-request", {params: {booking:bookingId}}).then((res) => {
                const _data = res.data;
                if (_data["message"] === 'success') {
                    toast.success("Your Cancelation Request Send Successfully.");
                }
            }).catch(err => toast.error("request canceled due to some issue try again or contact to developer."));
        }
    }
    const _date = resvTime.split(" ")[0];
    const isDate = new Date(_date).getTime();
    if (isDate > Date.now()) {
        _hide = true;
    }
    return (
        <button onClick={() => handleCancel()} className={`bg-blue-700 text-white rounded mt-4 font-semibold hover:bg-blue-500 ${_hide ? 'hidden': ''}`}>Cancel Booking</button>
    )
}