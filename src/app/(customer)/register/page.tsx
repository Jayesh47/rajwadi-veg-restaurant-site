'use client';
import api from "@/app/api";
import Link from 'next/link';
import React, { useReducer } from "react";
import {toast, Toaster} from 'react-hot-toast';

interface State {
    "username"?: string;
    "useremail"?: string;
    "user-password"?: string;
    "confirm-password"?: string;
}

interface Event {
    name: string;
    value: string;
}

const formReducer = (state: State, event: Event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

export default function Register() {
    const [formData, setFormData] = useReducer(formReducer, {});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            name: e.target.name,
            value: e.target.value
        });
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData["user-password"] === formData["confirm-password"]) {
            if (formData["user-password"] && formData["user-password"]?.length >= 8) {
                const res = await api.post('/user-register', formData);
                const data = res.data;
                if (data["message"] === "Success") {
                    sessionStorage.setItem("userToken", data["userToken"]);
                    toast.success('your account is created successfully.');
                    window.location.href = '/'
                }else if (data["message"] === "incomplete form") {
                    toast.error('All details are necessary to fill.');
                }else if (data["message"] === "user already exists") {
                    toast.error('User already exists.')
                }else {
                    toast.error('Internal error occurred, please try again later.');
                }
            }else {
                toast.error('your password is too short.');
            }
        } else {
            toast.error('your password is not matched!');
        }
    }
    return (
        <div className="h-screen flex justify-center items-center bg-gray-100">
            <Toaster />
            <form className="w-[50%] p-4 md:p-6 lg:p-12 bg-white rounded-lg shadow-2xl" method="post" onSubmit={handleSubmit}>
                <h1 className="text-3xl font-bold mb-4">Register</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        name="username"
                        className="w-full border-violet-500 border py-2 px-4 outline-violet-600"
                        id="name"
                        type="text"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        name="useremail"
                        className="w-full border-violet-500 border py-2 px-4 outline-violet-600"
                        id="email"
                        type="email"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        name="user-password"
                        className="w-full border-violet-500 border py-2 px-4 outline-violet-600"
                        id="password"
                        type="password"
                        placeholder="********"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
                        Confirm Password
                    </label>
                    <input
                        name="confirm-password"
                        className="w-full border-violet-500 border py-2 px-4 outline-violet-600"
                        id="confirm-password"
                        type="password"
                        placeholder="********"
                        onChange={handleChange}
                        required
                    />
                </div>
                <button
                    className="font-semibold text-lg border-2 border-violet-500 py-1 px-3 bg-violet-500 text-white hover:text-black hover:bg-transparent transition-all easy-in delay-150" type="submit">
                    Register
                </button>
                <p className="text-sm text-gray-500 mt-4">
                    already have an account?{" "}
                    <Link href="/login" className="text-violet-500 font-semibold hover:text-violet-700">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}