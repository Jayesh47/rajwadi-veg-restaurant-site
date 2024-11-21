'use client'
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserCog, faUsers, faClipboardList, faHome, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function AdminNavbar() {
    const routes = useRouter();
    useEffect(() => {
        if (!sessionStorage.getItem('adminToken')) {
            routes.replace("/");
        }
    }, []);
    const handleLogout = () => {
        sessionStorage.clear();
        routes.replace("/");
    }
    return (
        <div className="flex">
            <aside className="bg-white w-64 h-screen shadow-lg shadow-slate-600">
                <div className="flex items-center justify-center py-4">
                    <Image src="/logo.png" alt="Logo" width={150} height={100} />
                </div>
                <hr />
                <ul className="flex flex-col">
                    <li>
                        <Link href="/admin/admin-dashboard" className="flex font-[600] items-center p-4 md:hover:bg-gray-300">
                            <FontAwesomeIcon icon={faHome} className="mr-3" />
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/staff-attaindance" className="flex font-[600] items-center p-4 md:hover:bg-gray-300">
                            <FontAwesomeIcon icon={faUserCog} className="mr-3" />
                            Staff Attaindance
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/manage-staff" className="flex font-[600] items-center p-4 md:hover:bg-gray-300">
                            <FontAwesomeIcon icon={faUsers} className="mr-3" />
                            Manage Staffs
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/manage-orders" className="flex font-[600] items-center p-4 md:hover:bg-gray-300">
                            <FontAwesomeIcon icon={faClipboardList} className="mr-3" />
                            Manage Orders
                        </Link>
                    </li>

                    <li>
                        <input type="checkbox" id="manage-site-toggle" className="peer hidden" />
                        <label
                            htmlFor="manage-site-toggle"
                            className="cursor-pointer flex font-[600] items-center p-4 md:hover:bg-gray-300"
                        >
                            <FontAwesomeIcon icon={faEnvelope} className="mr-3" />
                            Manage Site Content
                            <span className="ml-auto">▼</span>
                        </label>

                        <div className="max-h-0 overflow-hidden transition-max-height duration-500 ease-in-out peer-checked:max-h-40">
                            <Link href="/admin/homepage" className="block px-8 py-2 hover:bg-gray-200">
                                Manage Homepage
                            </Link>
                            <Link href="/admin/menupage" className="block px-8 py-2 hover:bg-gray-200">
                                Manage Menupage
                            </Link>
                            <Link href="/admin/reservationpage" className="block px-8 py-2 hover:bg-gray-200">
                                Manage Reservation Page
                            </Link>
                        </div>
                    </li>
                </ul>

                <ul className="flex absolute w-60 bottom-0 border-t-2 justify-between border-slate-600 mt-5">
                    <li>
                        <Link href="/admin/profile" className="flex w-[12em] font-[600] bg-white items-center p-4 md:hover:bg-gray-200">
                            <FontAwesomeIcon icon={faUser} className="mr-3" />
                            Profile
                        </Link>
                    </li>
                    <li>
                        <button className="logout text-xl flex h-14 items-center justify-center w-10" title="Logout" onClick={handleLogout}>
                            <FontAwesomeIcon icon={faSignOutAlt} />
                        </button>
                    </li>
                </ul>
            </aside>
        </div>
    );
}
