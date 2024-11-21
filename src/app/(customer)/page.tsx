'use client';
import React, { useLayoutEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
    const [showLinks, setShowLinks] = useState(false);
    const [isLogin, setLogin] = useState(false);
    useLayoutEffect(() => {
        const isExists = sessionStorage.getItem("userToken");
        if (isExists) {
            setLogin(true);
        } else {
            setLogin(false);
        }
    }, []);
    const handleLogout = () => {
        sessionStorage.removeItem("userToken");
        window.location.reload();
    }
    return (
        <nav className="bg-white shadow-lg h-24 flex">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link href="/" className="flex items-center" prefetch={true}>
                    <Image src={"/logo.png"} alt="Rajwadi Restro" width={150} height={100} priority />
                </Link>
                <button
                    className="md:hidden flex justify-center items-center w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full"
                    onClick={() => setShowLinks(!showLinks)}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <ul className={`md:flex items-center mr-[-12em] space-x-4 ${showLinks ? 'block' : 'hidden'}`}>
                    <li className="relative group">
                        <Link href="/menu" className="text-gray-600 hover:text-gray-300 flex justify-center items-center h-[14.5vh] font-semibold hover:text-gray-300 hover:border-b-4 border-gray-300" prefetch={true}>Menu</Link>
                    </li>
                    <li className="relative group">
                        <Link href="/cart" className="text-gray-600 hover:text-gray-300 flex justify-center items-center h-[14.5vh] font-semibold hover:text-gray-300 hover:border-b-4 border-gray-300" prefetch={true}>Cart</Link>
                    </li>
                    <li className="font-semibold">
                        <Link href="/about" className="text-gray-600 flex h-[14.5vh] hover:text-gray-300 flex justify-center items-center hover:border-b-4 border-gray-300" prefetch={true}>About</Link>
                    </li>
                    <li className="font-semibold">
                        <Link href="/events" className="text-gray-600 flex h-[14.5vh] hover:text-gray-300 flex justify-center items-center hover:border-b-4 border-gray-300" prefetch={true}>Events</Link>
                    </li>
                    <li className="font-semibold">
                        <Link href="/reservation" className="text-gray-600 flex h-[14.5vh] hover:text-gray-300 flex justify-center items-center hover:border-b-4 border-gray-300" prefetch={true}>Reservation</Link>
                    </li>
                    {
                        isLogin ? (
                            [<li className="relative group font-semibold" key={1}>
                                <Link href="/my-orders" className="text-gray-600 flex h-[14.5vh] hover:text-gray-300 flex justify-center items-center hover:border-b-4 border-gray-300">Profile </Link>
                                <ul className="absolute bg-white shadow-md py-2 w-48 hidden group-hover:block dropdown-open:block">
                                    <li>
                                        <Link href={"/my-orders"} className="block px-4 py-2 hover:bg-gray-100 text-gray-600 hover:text-gray-900">Our Orders</Link>
                                    </li>
                                    <li>
                                        <Link href={"/my-reservations"} className="block px-4 py-2 hover:bg-gray-100 text-gray-600 hover:text-gray-900" prefetch={true}>Our Reservations</Link>
                                    </li>
                                </ul>
                            </li>,
                            <li className="font-semibold" key={2}>
                                <Link href="/login" className="text-gray-600 flex h-[14.5vh] hover:text-gray-300 flex justify-center items-center hover:border-b-4 border-gray-300" onClick={() => { handleLogout() }}>Logout </Link>
                            </li>]
                        ) :
                            (
                                <li className="font-semibold">
                                    <Link href="/login" className="text-gray-600 flex h-[14.5vh] hover:text-gray-300 flex justify-center items-center hover:border-b-4 border-gray-300" prefetch={true}>Login </Link>
                                </li>
                            )
                    }
                </ul>
                <div className="ml-4 text-gray-400 flex flex-col">
                    <small>rajwadiudaipur@gmail.com | +91 12345 67890</small>
                    <small><b>Open At: </b> Mon-Sat 8:00AM To 10:00PM</small>
                </div>
            </div>
        </nav>
    );
}