'use client';
import React, { useReducer } from "react";
import api from "@/app/api";
import Link from 'next/link';
import {toast, Toaster} from 'react-hot-toast';

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
            toast.success('your password is invalid.')
        }else if (_data["message"] === "user not exists") {
            toast.error('user not exists.')
        }else {
            toast.error('sorry something went wrong.');
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gray-100">
            <Toaster />
            <div className="w-[90%] md:w-[50%] -mt-[10em] p-4 md:p-6 lg:p-12 bg-white rounded-lg shadow-2xl">
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
