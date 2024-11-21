'use client'
import React, { useState } from "react";
import api from '@/app/api';
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
                setAlert({
                    title: 'Warning',
                    msg: 'Incorrect Password, try again.',
                    show: true
                });
            } else if (_res["message"] === "invalid email" && res.status === 401) {
                setAlert({
                    title: 'Warning',
                    msg: 'Incorrect Email.',
                    show: true
                });
            } else {
                setAlert({
                    title: 'Sorry!',
                    msg: 'Internal Server Error, Try Again Later.',
                    show: true
                });
            }
        }catch(err) {
            setAlert({
                title: 'Sorry!',
                msg: 'invalid credentials.',
                show: true
            });
        }
    }

    return (
        <div className="admin-login my-[20vh]">
            <h2 className="text-center text-[30px] font-bold">Admin Login Page</h2>
            {
                alert.show && (
                    <div id="alert-2" className="flex items-center p-4 mb-4 w-3/5 m-auto text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span className="sr-only">{alert.title}</span>
                        <div className="ms-3 text-sm font-medium">
                            <b>{alert.msg}</b>
                        </div>
                        <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" onClick={() => { setAlert({ title: "", msg: "", show: false }) }} data-dismiss-target="#alert-2" aria-label="Close">
                            <span className="sr-only">Close</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    </div>
                )
            }
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