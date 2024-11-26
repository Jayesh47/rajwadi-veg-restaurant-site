'use client'
import api from '@/app/api';
import React, {useState} from 'react';
import { useRouter } from 'next/navigation';
import {toast, Toaster} from 'react-hot-toast';

export default function Profile() {
    const [adminName, setAdmin] = useState("");
    const [adminEmail, setEmail] = useState("");
    const [adminPass, setPass] = useState("");
    const [Alert, setAlert] = useState({
        title: "",
        message: "",
        show: false
    });
    const routes = useRouter();
    const handleSubmit = async (e :React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = sessionStorage.getItem('adminToken');
        const formData = new FormData();
        formData.append("username", adminName);
        formData.append("useremail", adminEmail);
        formData.append("userpass", adminPass);
        try {
            const res = await api.put("/update-admin-details", formData, {headers: {'Authorization': `Bearer ${token}`}});
            const _res = res.data;
            if (_res["message"] === "success") {
                toast.success("Your details updated successfully.");
            }
        }catch (err) {
            toast.error("Server responded unauthenticate access! this page will destroy within second.");
            routes.replace("/");
        }
    }
    return (
        <section className="p-3 flex flex-col h-[98vh]">
            <Toaster />
            <h1 className='text-3xl text-white font-semibold'>Admin Profile</h1>
            <form method="post" className='mt-8 w-4/5 flex flex-col' onSubmit={handleSubmit}>
                <input type="text" name="username" className='mt-6 px-6 py-2 outline-orange-400' placeholder='Change Admin Name...' onChange={(e) => setAdmin(e.target.value)} />
                <input type="text" name="useremail" className='mt-6 px-6 py-2 outline-orange-400' placeholder='Change Admin Email...' onChange={(e) => setEmail(e.target.value)} />
                <input type="text" name="userpass" className='mt-6 px-6 py-2 outline-orange-400' placeholder='Change Admin Password...' onChange={(e) => setPass(e.target.value)} />
                <button type="submit" className='w-[5em] bg-blue-800 text-white font-bold mt-6 py-3'>Edit</button>
            </form>
        </section>
    )
}