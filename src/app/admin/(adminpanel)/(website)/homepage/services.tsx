'use client';
import React, {useState} from 'react';
import api from '@/app/api';

export default function Services() {
    const [coverImg, setCoverImg] = useState<File | null>(null);
    const [service, setService] = useState("");
    const [alert, setAlert] = useState({
        title: "",
        msg: "",
        show: false
    });
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const _form = new FormData();
        if (coverImg)
            _form.append("ServiceCoverImg", coverImg);
        _form.append("Service", service);
        try {
            const res = await api.put("/manage-homepage/manage-service", _form, {'headers': {'Content-Type': 'multipart/form-data'}});
            const res_ = res.data;
            if (res_["message"] === "success") {
                setAlert({
                    title: "Success:",
                    msg: "Services are updated successfully, for see click on visit site.",
                    show: true
                });
            }else if (res_["message"] === "Empty Form!") {
                setAlert({
                    title: "Info:",
                    msg: "Form is empty try to fill the form!",
                    show: true
                });
            }
        }catch (err) {
            setAlert({
                title: "Warning!",
                msg: "Internal Server Error, try to pay more to developer!",
                show: true
            });
        }
    }
    return (
        <div>
            <input type="checkbox" id="services-management" className="peer hidden" />
            <label htmlFor="services-management" className="cursor-pointer shadow-lg shadow-slate-400 flex font-[600] bg-white mt-4 rounded items-center p-4">
                Change In Services {alert.show && (<span className='ml-8 text-red-500 font-mono'><b>({alert.title}</b> <span>{alert.msg})</span></span>)}
                <span className="ml-auto">▼</span>
            </label>
            <div className="max-h-0 overflow-hidden transition-max-height duration-500 ease-in-out peer-checked:max-h-fit">
                <form method="post" className="my-3" onSubmit={handleSubmit} encType='multipart/form-data'>
                    <label className="flex flex-col items-center px-4 py-2 bg-white text-blue-600 rounded-lg shadow-lg tracking-wide uppercase cursor-pointer hover:bg-gray-700 hover:text-white">
                        <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M16.88 10.41l-5-5A1.41 1.41 0 0 0 10 5H6A2 2 0 0 0 4 7v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10.83a1.41 1.41 0 0 0-.41-1zM12 10V6.41L15.59 10H12z" />
                        </svg>
                        <span className="mt-2 text-base leading-normal">{!coverImg ? "Select a file for Cover Image" : `Selected File: ${coverImg.name}`}</span>
                        <span className="mt-2 text-base leading-normal">(.jpg, .jpeg, .png)</span>
                        <input type="file" className="hidden" name='ServiceCoverImg' onChange={(e) => {if (e.target.files) setCoverImg(e.target.files?.[0])}} />
                    </label>
                    <textarea name="services" id="services" maxLength={400} onChange={(e) => setService(e.target.value)} className="w-full p-4 rounded-md mt-3 shadow-lg" rows={5} placeholder="What Type of Services provided by Rajwadi restaurant...!!"></textarea>
                    <button type="submit" className='btn bg-blue-800 py-2 w-28 text-white rounded-lg hover:bg-blue-950 shadow-lg mt-2'>Submit</button>
                </form>
            </div>
        </div>
    )
}