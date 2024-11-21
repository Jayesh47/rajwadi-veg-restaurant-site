'use client';
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import api from '@/app/api';
import {toast, Toaster} from 'react-hot-toast';

interface ProductDetail {
    thumbnail?: string;
    productName?: string;
    productPrice?: string;
    productId?: string;
}

export default function OrderBtn({ thumbnail, productName, productPrice, productId }: ProductDetail) {
    const [btntext, setBtnText] = useState("Add To Cart");
    const routes = useRouter();
    const token = sessionStorage.getItem("userToken");
    useEffect(() => {
        api.get("/view-to-cart", {headers: {'Authorization': token}}).then((res) => {
            const _res = res.data["message"];
            _res.map((_item:any) => {
                if (_item["_prodId"] === productId) {
                    setBtnText("View in Cart");
                }
            });
        }).catch ((err) => console.log(err));
    }, []);
    const handleCart = () => {
        if (btntext === "Add To Cart") {
            const data = {
                _prodImg: thumbnail,
                _prodName: productName,
                _prodPrice: productPrice,
                _prodId: productId
            }
            api.put("/add-to-cart", data, {headers: {'Authorization': token}}).then((res) => {
                const _res = res.data;
                if (_res["message"] === "Success") {
                    setBtnText("View in Cart");
                }else if (_res["message"] === 'unknown user') {
                    toast.error('Login Required');
                }
            }).catch((err) => console.log(err));
        }
        if (btntext === "View in Cart") {
            routes.push("/cart");
        }
    }
    return (
        <button onClick={handleCart} className="relative inline-block h-fit px-4 py-2 text-white uppercase text-sm tracking-wider font-medium overflow-hidden transition-all duration-300 group">
            <Toaster />
            <span className="absolute inset-0 bg-red-500 -z-10"></span>
            <span className="absolute inset-0 bg-red-700 w-0 transition-all duration-300 group-hover:w-full -z-10"></span>
            <span className="relative z-10">{btntext}</span>
        </button>
    );
}
