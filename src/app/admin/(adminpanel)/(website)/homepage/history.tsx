'use client'
import React, { useState } from "react";
import api from '@/app/api';

export default function HistoryManage() {
    const [coverImg, setCoverImg] = useState<File | null>(null);
    const [history, setHistory] = useState('');
    const [alert, setAlert] = useState({
        title: "",
        msg: "",
        show: false
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const _form = new FormData();
        if (coverImg) {
            _form.append("historyCoverImg", coverImg);
        }
        _form.append("history", history);
        try {
            const res = await api.put("/manage-homepage/manage-history", _form, { headers: { 'Content-Type': 'multipart/form-data' } });
            if (res) {
                const _res = res.data;
                if (_res["message"] === "success") {
                    setAlert({
                        title: "Success: ",
                        msg: "History updated successfully.",
                        show: true
                    });
                } else if (_res["message"] === "Empty Form!") {
                    setAlert({
                        title: "message: ",
                        msg: "Sorry form is empty now.",
                        show: true
                    });
                }
            }
        } catch (err) {
            setAlert({
                title: "Message: ",
                msg: "Internal Server Error, Please pay more fees to developer.",
                show: true
            });
        }
    }

    return (
        <div>
            <input type="checkbox" id="history-management" className="peer hidden" />
            <label htmlFor="history-management" className="cursor-pointer shadow-lg shadow-slate-400 flex font-[600] bg-white mt-4 rounded items-center p-4">
                Change In History {alert.show && (<span className="mx-9 text-red-500"><strong>{alert.title}</strong> {alert.msg}</span>)}
                <span className="ml-auto">▼</span>
            </label>
            <div className="max-h-0 overflow-hidden transition-max-height duration-500 ease-in-out peer-checked:max-h-fit">
                <form method="post" className="my-3" onSubmit={handleSubmit} encType="multipart/form-data">
                    <label className="flex flex-col items-center px-4 py-2 bg-white text-blue-600 rounded-lg shadow-lg tracking-wide uppercase cursor-pointer hover:bg-gray-700 hover:text-white">
                        <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M16.88 10.41l-5-5A1.41 1.41 0 0 0 10 5H6A2 2 0 0 0 4 7v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10.83a1.41 1.41 0 0 0-.41-1zM12 10V6.41L15.59 10H12z" />
                        </svg>
                        <span className="mt-2 text-base leading-normal font-semibold">{!coverImg ? "Select a file for Cover Image" : `Selected File: ${coverImg.name}`}</span>
                        <span className="mt-2 text-base leading-normal">(.jpg, .jpeg, .png)</span>
                        <input type="file" name="historyCoverImg" onChange={(e) => { if (e.target.files) setCoverImg(e.target.files?.[0]) }} className="hidden" />
                    </label>
                    <textarea name="history" id="history" maxLength={400} onChange={(e) => setHistory(e.target.value)} className="w-full p-4 rounded-md mt-4 shadow-lg" rows={5} placeholder="Provide Rajwadi Restaurant History..."></textarea>
                    <button type="submit" className='btn bg-blue-800 py-2 w-28 text-white rounded-lg hover:bg-blue-950 shadow-md shadow-gray-600 mt-4'>Submit</button>
                </form>
            </div>
        </div>
    )
}