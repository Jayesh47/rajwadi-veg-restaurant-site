'use client';
import React, { useLayoutEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

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
        <nav className="navbar bg-white shadow-lg h-24 flex">
            <div className="container mx-auto px-0 md:px-4 flex justify-between items-center">
                <Link href="/" className="logo flex ml-3 md:ml-0 items-center" prefetch={true}>
                    <Image src={"/logo.png"} alt="Rajwadi Restro" width={150} height={100} priority />
                </Link>
                {/* Menu */}
                <ul
                    className={`fixed text-2xl md:text-base top-24 md:top-0 right-0 h-screen bg-white/90 shadow-lg z-20 w-full md:relative md:w-2/5 justify-end md:bg-transparent md:shadow-none md:flex items-center space-y-12 md:space-y-0 md:space-x-4 p-6 md:p-0 transition-transform delay-150 duration-300 transform ${showLinks ? "translate-x-0" : "translate-x-full"
                        } md:translate-x-0`}
                >
                    <li className="relative group text-center">
                        <Link
                            href="/menu"
                            className="text-gray-600 pb-4 hover:border-b-4 hover:text-gray-300 font-semibold"
                            prefetch={true}
                        >
                            Menu
                        </Link>
                    </li>
                    <li className="relative group text-center">
                        <Link
                            href="/cart"
                            className="text-gray-600 pb-4 hover:border-b-4 hover:text-gray-300 font-semibold"
                            prefetch={true}
                        >
                            Cart
                        </Link>
                    </li>
                    <li className="font-semibold text-center">
                        <Link href="/about" className="text-gray-600 pb-4 hover:border-b-4 hover:text-gray-300" prefetch={true}>
                            About
                        </Link>
                    </li>
                    <li className="font-semibold text-center">
                        <Link href="/events" className="text-gray-600 pb-4 hover:border-b-4 hover:text-gray-300" prefetch={true}>
                            Events
                        </Link>
                    </li>
                    <li className="font-semibold text-center">
                        <Link href="/reservation" className="text-gray-600 pb-4 hover:border-b-4 hover:text-gray-300" prefetch={true}>
                            Reservation
                        </Link>
                    </li>
                    {isLogin ? (
                        <>
                            <li className="relative group font-semibold text-center">
                                <Link href="/my-orders" className="text-gray-600 pb-4 hover:border-b-4 hover:text-gray-300">
                                    Profile
                                </Link>
                            </li>
                            <li className="font-semibold text-center">
                                <Link
                                    href="/login"
                                    className="text-gray-600 hover:border-b-4 pb-4 hover:text-gray-300"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Link>
                            </li>
                        </>
                    ) : (
                        <li className="font-semibold text-center">
                            <Link href="/login" className="text-gray-600 hover:border-b-4 pb-4 hover:text-gray-300" prefetch={true}>
                                Login
                            </Link>
                        </li>
                    )}
                </ul>
                {/* Contact Info */}
                <div className="hidden ml-4 text-gray-400 md:flex md:flex-col">
                    <small>rajwadiudaipur@gmail.com | +91 12345 67890</small>
                    <small>
                        <b>Open At: </b> Mon-Sat 8:00AM To 10:00PM
                    </small>
                </div>
                {/* Menu Toggle Button */}
                <button
                    className="md:hidden flex justify-center items-center w-8 h-8"
                    onClick={() => {
                        setShowLinks(!showLinks);
                        document.body.classList.toggle("no-scroll", !showLinks);
                    }}
                >
                    {!showLinks ? (
                        <FontAwesomeIcon icon={faBars} className="text-3xl mr-6" />
                    ) : (
                        <FontAwesomeIcon icon={faTimes} className="text-3xl mr-6" />
                    )}
                </button>
            </div>
        </nav>

    );
}