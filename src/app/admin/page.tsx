'use client'
import React, { useState } from "react";
import api from '@/app/api';
import {toast, Toaster} from 'react-hot-toast';
import { useRouter } from "next/navigation";

export default function Admin() {
    const [Name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [alert, setAlert] = useState({
        title: "",
        msg: "",
        show: false
    });
    const routes = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', Name);
        formData.append('useremail', email);
        formData.append('password', password);
        formData.append('role', role);
        try {

            const res = await api.post('/admin-login', formData);
            const _res = res.data;
            if (_res["message"] === "success") {
                sessionStorage.setItem("adminToken", _res["adminToken"]);
                routes.push("/admin/admin-dashboard");
            } else if (_res["message"] === "invalid password") {
                toast.error("Incorrect Password, try again.");
            } else if (_res["message"] === "invalid email" && res.status === 401) {
                toast.error("Incorrect Email.");
            } else {
                toast.error("Internal Server Error, Try Again Later.");
            }
        }catch(err) {
            toast.error("invalid credentials.");
        }
    }

    return (
        <div className="admin-login my-[20vh]">
            <Toaster />
            <h2 className="text-center text-[30px] font-bold">Admin Login Page</h2>
            <form method="post" className="w-3/5 m-auto" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="email">
                        Name
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-orange-500"
                        placeholder="Enter your name"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="useremail"
                        name="useremail"
                        className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-orange-500"
                        placeholder="Enter your email"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-orange-500"
                        placeholder="Enter your password"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <span className="flex items-center">
                        <input type="radio" name="role" value={"admin"} id="admin" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRole(e.target.value)} />
                        <label className="block text-sm font-medium ml-3" htmlFor="admin">As Admin</label>
                    </span>
                    <span className="flex items-center mt-2">
                        <input type="radio" name="role" value={"sub-admin"} id="subadmin" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRole(e.target.value)} />
                        <label className="block text-sm font-medium ml-3" htmlFor="subadmin">As Sub-Admin</label>
                    </span>
                </div>

                <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-orange-500">
                    Login
                </button>
            </form>
        </div>
    )
}