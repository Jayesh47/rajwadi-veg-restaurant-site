'use client'
import React, { useState, useEffect } from "react";
import Image from 'next/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faArrowUpRightFromSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import api from '@/app/api';
import { toast, Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Cart() {
    const [data, setData] = useState([]);
    const [qty, setQty] = useState([1]);
    const [isAuth, setAuth] = useState(false);
    // order booking details.
    const [upi, setUpi] = useState('');
    const routes = useRouter();

    useEffect(() => {
        const token = sessionStorage.getItem('userToken');
        if (token) {
            setAuth(true);
            api.get("/view-to-cart", { 'headers': { 'Authorization': token } }).then((res) => {
                const _res = res.data["message"];
                if (_res) {
                    setData(_res);
                    setQty(new Array(_res.length).fill(1));
                }
            }).catch((err) => console.log(err));
        }
    }, []);

    const handleMinus = (i: number) => {
        const newQty = [...qty];
        if (newQty[i] > 1) {
            newQty[i]--;
            setQty(newQty);
        }
    };

    const handlePlus = (i: number) => {
        const newQty = [...qty];
        newQty[i]++;
        setQty(newQty);
    };

    const handleTotalPrice = () => {
        return data.reduce((prev, curr, i) => { return (prev + (curr["_prodPrice"] * qty[i])) }, 0);
    };

    const totalBill = (total: number) => {
        const calc_gst = total * 5 / 100;
        return total + calc_gst;
    };

    const handleDelete = (id: string) => {
        const token = sessionStorage.getItem('userToken');
        api.delete("/delete-to-cart", { params: { prodId: id }, headers: { 'Authorization': token } }).then((res) => {
            const _Res = res.data;
            if (_Res["message"] === "success") {
                toast.success("Product Removed From Cart Successfully.");
            }
        }).catch((err) => { console.log(err); toast.error("Internal Error Occurred") });
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Prepare the data for each product
        const productData = data.map((item, i) => {
            const productPrice = item["_prodPrice"];
            const productQty = qty[i];
            const _totalBill = totalBill(productPrice * productQty);

            return {
                productName: item["_prodName"],
                productPrice: productPrice,
                productQty: productQty,
                customerUPI: upi,
                TotalBill: _totalBill,
            };
        });

        // Get the token from sessionStorage
        const token = sessionStorage.getItem('userToken');

        // // Send the data to the backend API
        api.post("/order-products", { products: productData }, {
            headers: { 'Authorization': `Bearer ${token}` } // Send the token in the header
        })
            .then((res) => {
                // Handle successful response
                if (res.data.message === "success") {
                    toast.success("Products successfully saved.");
                    routes.replace("/success");
                } else {
                    toast.error("Error saving products.");
                }
            })
            .catch((err) => {
                toast.error("Internal error occurred.");
            });
    };


    return (
        <section className="cart p-6 flex justify-between bg-zinc-100">
            <Toaster />
            {
                isAuth ? [
                    <div className="flex flex-col w-3/4">
                        {data.map((item, i) => (
                            <div key={i} className="grid grid-cols-[18%_40%_10%_20%_10%] mb-3 bg-white h-[20vh] items-center p-4 shadow-lg">
                                <Image src={item["_prodImg"]} alt={item["_prodName"]} width={100} height={100} className="w-[140px] h-[100px]" />
                                <div className="w-[14rem] mr-32">
                                    <h1 className="text-2xl font-semibold">{item["_prodName"]}</h1>
                                    <h1 className="text-xl">₹{item["_prodPrice"]}</h1>
                                </div>
                                <div>
                                    <span className="flex items-end justify-end">
                                        <button className="text-lg" onClick={() => handleMinus(i)}>
                                            <FontAwesomeIcon icon={faMinus} />
                                        </button>
                                        <input type="text" name="qty" id="qty" className="w-12 text-center text-xl font-semibold" value={qty[i]} readOnly />
                                        <button className="text-lg" onClick={() => handlePlus(i)}>
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </span>
                                </div>
                                <div className="flex justify-center font-semibold">
                                    ₹{item["_prodPrice"] * qty[i]}
                                </div>
                                <div className="grid items-end">
                                    <button className="text-red-600" onClick={() => handleDelete(item["_prodId"])}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>,
                    <div className="checkout grid grid-rows-[12%_40%_] bg-white p-4 h-[86vh] shadow-lg">
                        <h1 className="text-2xl font-semibold border-b-2">CHECKOUT</h1>
                        <div className="grid grid-cols-2 mt-3">
                            <h1 className="font-semibold">Total Product Price:</h1>
                            <h1 className="text-end">₹{handleTotalPrice()}</h1>
                            <h1 className="font-semibold my-2">CGST:</h1>
                            <h1 className="text-end my-2">2.5%</h1>
                            <h1 className="font-semibold">SGST:</h1>
                            <h1 className="text-end">2.5%</h1>
                            <hr /><hr />
                            <h1 className="font-semibold text-gray-500 mt-2">Total Payment:</h1>
                            <h1 className="font-semibold text-gray-500 text-end mt-2">₹{totalBill(handleTotalPrice())}</h1>
                        </div>
                        <form method="post" onSubmit={handleSubmit}>
                            <div className="payment-method border-t-2 mt-2">
                                <h1 className="text-lg font-semibold border-b-2 uppercase">Payment Method</h1>
                                <input type="text" name="upi" id="upi" className="border-2 w-full mt-4 p-4 font-semibold outline-gray-200" placeholder="Enter Your Upi ID..." onChange={(e) => setUpi(e.target.value)} required />
                                <Image src={"/QR.jpg"} alt="qr" width={100} height={100} className="relative left-44 top-5"></Image>
                            </div>
                            <div className="grid items-end">
                                <button type="submit" className="relative inline-block px-4 w-fit py-2 text-white uppercase text-sm tracking-wider font-medium overflow-hidden transition-all duration-300 group">
                                    <span className="absolute inset-0 bg-blue-600 z-10"></span>
                                    <span className="absolute inset-0 bg-blue-800 w-0 transition-all duration-300 group-hover:w-full z-10"></span>
                                    <span className="relative z-10">Proceed To Pay</span>
                                </button>
                            </div>
                        </form>
                    </div>
                ] :
                    <div className="text-center w-full">
                        <h1 className="text-3xl font-semibold my-4">Login Required!</h1>
                        <Link href={"/login"} className="text-xl my-5 hover:underline">Go To Login Page <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></Link>
                    </div>
            }
        </section>
    );
}
