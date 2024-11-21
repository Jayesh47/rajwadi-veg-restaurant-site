'use client'
import api from '@/app/api';
import React, {useState} from 'react';
import { useRouter } from 'next/navigation';

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
                setAlert({
                    title: "Success: ",
                    message: "Your details updated successfully.",
                    show: true
                });
            }
        }catch (err) {
            setAlert({
                title: "Warning! ",
                message: "Server responded unauthenticate access! this page will destroy within second.",
                show: true
            });
            routes.replace("/");
        }
    }
    return (
        <section className="p-3 flex flex-col h-[98vh]">
            {
                Alert.show && (
                    <div id="alert-2" className="flex items-center p-4 my-9 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span className="sr-only">{Alert.title}</span>
                        <div className="ms-3 text-sm font-medium">
                            <b>{Alert.message}</b>
                        </div>
                        <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" onClick={() => { setAlert({ title: "", message: "", show: false }) }} data-dismiss-target="#alert-2" aria-label="Close">
                            <span className="sr-only">Close</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    </div>
                )
            }
            <h1 className='text-3xl'>Admin Profile</h1>
            <form method="post" className='mt-8 w-4/5 flex flex-col' onSubmit={handleSubmit}>
                <input type="text" name="username" className='mt-6 px-6 py-2 outline-orange-400' placeholder='Change Admin Name...' onChange={(e) => setAdmin(e.target.value)} />
                <input type="text" name="useremail" className='mt-6 px-6 py-2 outline-orange-400' placeholder='Change Admin Email...' onChange={(e) => setEmail(e.target.value)} />
                <input type="text" name="userpass" className='mt-6 px-6 py-2 outline-orange-400' placeholder='Change Admin Password...' onChange={(e) => setPass(e.target.value)} />
                <button type="submit" className='w-[5em] bg-blue-800 text-white font-bold mt-6 py-3'>Edit</button>
            </form>
        </section>
    )
}