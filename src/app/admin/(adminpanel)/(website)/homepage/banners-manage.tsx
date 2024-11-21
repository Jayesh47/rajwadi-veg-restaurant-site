'use client'
import React, { useState } from 'react';
import api from '@/app/api';

export default function BannersManagement() {
    const [banner1, setBanner1] = useState<File | null>(null);
    const [banner2, setBanner2] = useState<File | null>(null);
    const [banner3, setBanner3] = useState<File | null>(null);
    const [banner4, setBanner4] = useState<File | null>(null);
    const [alert, setAlert] = useState({
        title: "",
        message: "",
        show: false
    });
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        if (banner1) formData.append('banner1', banner1);
        if (banner2) formData.append('banner2', banner2);
        if (banner3) formData.append('banner3', banner3);
        if (banner4) formData.append('banner4', banner4);
        try {
            const res = await api.put("/manage-homepage/manage-banners", formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            const _res = res.data;
            if (_res["message"] === "success") {
                setAlert({
                    title: "Success",
                    message: 'Banners Has Been Changed.',
                    show: true
                });
            }else if (_res["message"] === "Empty Form") {
                setAlert({
                    title: "Warning!",
                    message: 'Empty Form, try to fill the form for change in banners.',
                    show: true
                });
            }
        }catch (err) {
            setAlert({
                title: "Warning!",
                message: 'Internal Server Error, try to pay more to developer!',
                show: true
            });
        }
    }
    return (
        <div>
            <input type="checkbox" id="banner-management" className="peer hidden" />
            <label htmlFor="banner-management" className="cursor-pointer shadow-lg shadow-slate-400 flex font-[600] bg-white mt-2 rounded items-center p-4">
                Change In Banners {alert.show && (<span className="mx-9 text-red-500"><strong>{alert.title}: </strong> {alert.message}</span>)}
                <span className="ml-auto">▼</span>
            </label>
            <div className="max-h-0 overflow-hidden transition-max-height duration-500 ease-in-out peer-checked:max-h-fit">
                <form method="post" className='flex flex-col overflow-auto h-[70vh] text-gray-500 p-3' onSubmit={handleSubmit} encType='multipart/form-data'>
                    <label className="flex flex-col items-center px-4 py-2 bg-white text-blue-600 rounded-lg shadow-lg tracking-wide uppercase cursor-pointer hover:bg-gray-700 hover:text-white">
                        <svg
                            className="w-8 h-8"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path d="M16.88 10.41l-5-5A1.41 1.41 0 0 0 10 5H6A2 2 0 0 0 4 7v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10.83a1.41 1.41 0 0 0-.41-1zM12 10V6.41L15.59 10H12z" />
                        </svg>
                        <span className="mt-2 text-base leading-normal">{!banner1 ? "Select a file for Banner - 1" : `Selected File: ${banner1.name}`}</span>
                        <span className="mt-2 text-base leading-normal">(.jpg, .jpeg, .png)</span>
                        <input type="file" className="hidden" name='banner1' onChange={(e) => { if (e.target.files) setBanner1(e.target.files[0]) }} />
                    </label>
                    <label className="flex flex-col items-center px-4 py-2 bg-white text-blue-600 rounded-lg shadow-lg tracking-wide uppercase my-2 cursor-pointer hover:bg-gray-700 hover:text-white">
                        <svg
                            className="w-8 h-8"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path d="M16.88 10.41l-5-5A1.41 1.41 0 0 0 10 5H6A2 2 0 0 0 4 7v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10.83a1.41 1.41 0 0 0-.41-1zM12 10V6.41L15.59 10H12z" />
                        </svg>
                        <span className="mt-2 text-base leading-normal">{!banner2 ? "Select a file for Banner - 2" : `Selected File: ${banner2.name}`}</span>
                        <span className="mt-2 text-base leading-normal">(.jpg, .jpeg, .png)</span>
                        <input type="file" className="hidden" name='banner2' onChange={(e) => { if (e.target.files) setBanner2(e.target.files[0]) }} />
                    </label>
                    <label className="flex flex-col items-center px-4 py-2 bg-white text-blue-600 rounded-lg shadow-lg tracking-wide uppercase  cursor-pointer hover:bg-gray-700 hover:text-white">
                        <svg
                            className="w-8 h-8"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path d="M16.88 10.41l-5-5A1.41 1.41 0 0 0 10 5H6A2 2 0 0 0 4 7v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10.83a1.41 1.41 0 0 0-.41-1zM12 10V6.41L15.59 10H12z" />
                        </svg>
                        <span className="mt-2 text-base leading-normal">{!banner3 ? "Select a file for Banner - 3" : `Selected File: ${banner3.name}`}</span>
                        <span className="mt-2 text-base leading-normal">(.jpg, .jpeg, .png)</span>
                        <input type="file" className="hidden" name='banner3' onChange={(e) => { if (e.target.files) setBanner3(e.target.files[0]) }} />
                    </label>
                    <label className="flex flex-col mt-2 items-center px-4 py-2 bg-white text-blue-600 rounded-lg shadow-lg tracking-wide uppercase  cursor-pointer hover:bg-gray-700 hover:text-white">
                        <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M16.88 10.41l-5-5A1.41 1.41 0 0 0 10 5H6A2 2 0 0 0 4 7v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10.83a1.41 1.41 0 0 0-.41-1zM12 10V6.41L15.59 10H12z" />
                        </svg>
                        <span className="mt-2 text-base leading-normal">{!banner4 ? "Select a file for Banner - 4" : `Selected File: ${banner4.name}`}</span>
                        <span className="mt-2 text-base leading-normal">(.jpg, .jpeg, .png)</span>
                        <input type="file" className="hidden" name='banner4' onChange={(e) => { if (e.target.files) setBanner4(e.target.files[0]) }} />
                    </label>

                    <button type="submit" className='btn bg-blue-800 py-2 w-28 text-white rounded-lg hover:bg-blue-950 shadow-md shadow-gray-400 mt-4'>Submit</button>
                </form>
            </div>
        </div>
    )
}