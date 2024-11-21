'use client';
import React, { useReducer, useState } from "react";
import api from "@/app/api";
import Link from 'next/link';

// Define the form state type
interface FormState {
    username?: string;
    email?: string;
    password?: string;
}

// Define the event type for the reducer
interface FormEvent {
    name: string;
    value: string;
}

// Reducer function to handle form state updates
const formReducer = (state: FormState, event: FormEvent) => {
    return {
        ...state,
        [event.name]: event.value,
    };
};

export default function Login() {
    const [formData, setFormData] = useReducer(formReducer, {});
    const [Alert, setAlert] = useState({
        title: "",
        msg: "",
        show: false
    });
    // Type the event correctly for handleChange
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            name: e.target.name,
            value: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await api.post("/user-login", formData);
        const _data = res.data;
        if (_data["message"] === "Success") {
            sessionStorage.setItem("userToken", _data["userToken"]);
            window.location.href = "/";
        }else if (_data["message"] === "incorrect password") {
            setAlert({
                title: "warning",
                msg: "your password is invalid.",
                show: true
            });
        }else if (_data["message"] === "user not exists") {
            setAlert({
                title: "warning",
                msg: "user not exists.",
                show: true
            });
        }else {
            setAlert({
                title: "warning",
                msg: "sorry something went wrong.",
                show: true
            });
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gray-100">
            <div className="w-[50%] p-4 md:p-6 lg:p-12 bg-white rounded-lg shadow-2xl">
                {
                    Alert.show && (
                        <div id="alert-2" className="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">{Alert.title}</span>
                            <div className="ms-3 text-sm font-medium">
                                <b>{Alert.msg}</b>
                            </div>
                            <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" onClick={() => {setAlert({title: "", msg: "", show: false})}} data-dismiss-target="#alert-2" aria-label="Close">
                                <span className="sr-only">Close</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                            </button>
                        </div>
                    )
                }
                <h1 className="text-3xl font-bold mb-4">Login</h1>
                <form method="post" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="useremail"
                            name="useremail"
                            className="border-2 border-violet-400 w-full py-2 px-3 font-semibold outline-violet-400"
                            onChange={handleChange}
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
                            className="border-2 border-violet-400 w-full py-2 px-3 font-semibold outline-violet-400"
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-violet-500 px-4 py-1 w-28 text-lg border-2 transition-all easy-in delay-150 border-violet-500 font-semibold text-white hover:bg-transparent hover:text-black">
                        Login
                    </button>
                </form>
                <p className="text-sm text-gray-500 mt-4">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-violet-500 font-semibold hover:text-violet-700">
                        Register Here
                    </Link>
                </p>
            </div>
        </div >
    );
}
