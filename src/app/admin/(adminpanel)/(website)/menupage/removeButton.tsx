import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { toast, Toaster } from 'react-hot-toast';
import api from '@/app/api';

interface product {
    productId: String
}

export default function RemoveButton({ productId }: product) {
    const handleRemove = async () => {
        if (productId) {
            const res = await api.delete("/remove-item", { data: productId });
            if (res.data["message"] === "success") {
                window.location.reload();
                setTimeout(() => {
                    toast.success("Product Successfully Deleted!");
                }, 1500);
            } else {
                toast.error("Internal Error Occurred, give some money to developer.")
            }
        }
    }
    return (
        <span>
            <Toaster />
            <button className="hover:underline hover:text-red-500 font-semibold" onClick={() => handleRemove()}><FontAwesomeIcon icon={faTimes} /> Remove</button>
        </span>
    )
}