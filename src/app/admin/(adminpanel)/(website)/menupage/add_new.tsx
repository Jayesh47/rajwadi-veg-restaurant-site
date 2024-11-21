'use client'
import React, { useState } from 'react'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast, Toaster } from 'react-hot-toast';
import api from '@/app/api';

export default function AddNewProduct() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [description, setDesc] = useState("");
    const [discount, setDiscount] = useState("");
    const [category, setCategory] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formdata = new FormData();

        if (thumbnail) formdata.append("productImg", thumbnail);
        formdata.append("productName", productName);
        formdata.append("productPrice", productPrice);
        formdata.append("description", description);
        formdata.append("discount", discount);
        formdata.append("category", category);
        console.log(productName);

        try {
            const res = await api.put('/add-new-product', formdata, { headers: { "Content-Type": 'multipart/form-data' } });
            if (res.data["message"] === "success") {
                toast.success("Product Added Successfully.");
            }
        } catch (error) {
            console.error('Error uploading product:', error);
        }
    };
    const handleModalOpen = () => {
        setIsModalOpen(true);
    };
    const handleModalClose = () => {
        setIsModalOpen(false);
    };
    return (
        <div className='relative'>
            <Toaster />
            <button className="bg-white text-black font-semibold shadow-lg shadow-gray-500 px-4 py-2 transition" onClick={handleModalOpen}>
                Add New Product
            </button>
            <div className={`absolute flex flex-col text-white bg-black h-screen rounded-xl mt-4 mr-[-26px] p-4 left-[-6em] w-fit transition-transform ${isModalOpen ? '-translate-y-[0%]' : '-translate-y-[-80%]'}`}>
                <span className='border-b-2 border-gray-500 flex justify-between'>
                    <h3 className='py-2 font-semibold text-xl'>Add New Product</h3>
                    <span onClick={handleModalClose} className='cursor-pointer'><FontAwesomeIcon icon={faTimes} /></span>
                </span>
                <form method="post" className='text-gray-400 flex flex-col mt-4' onSubmit={handleSubmit} encType='multipart/form-data'>
                    <label htmlFor="thumbnail" className='w-[16em] my-2 bg-gray-800 px-3 py-2 font-semibold text-white'>{!thumbnail ? "Click To Choose Product Image" : thumbnail.name}</label>
                    <input type="file" name="thumbnail" id="thumbnail" required onChange={(e) => { if (e.target.files) setThumbnail(e.target.files[0]) }} hidden />
                    <input type="text" name="product-name" className='w-full my-2 py-2 px-3 bg-gray-800 outline-gray-200' placeholder='product name' onChange={(e) => setProductName(e.target.value)} required />
                    <input type="text" name="product-price" className='w-full my-2 py-2 px-3 bg-gray-800 outline-gray-200' placeholder='product price' onChange={(e) => setProductPrice(e.target.value)} required />
                    <input type="text" name="product-discount" className='w-full my-2 py-2 px-3 bg-gray-800 outline-gray-200' placeholder='product discount' onChange={(e) => setDiscount(e.target.value)} required />
                    <input type="text" name="product-description" className='w-full my-2 py-2 px-3 bg-gray-800 outline-gray-200' placeholder='product description' onChange={(e) => setDesc(e.target.value)} required />
                    <select name="product-category" className='text-gray-400 bg-gray-800 px-3 py-2 my-2 cursor-pointer outline-gray-200' onChange={e => setCategory(e.target.value)} required>
                        <option value="Rajasthani">Rajasthani</option>
                        <option value="Punjabi">Punjabi</option>
                        <option value="Gujrati">Gujrati</option>
                        <option value="South Indian">South Indian</option>
                        <option value="Chineese">Chineese</option>
                        <option value="Italian">Italian</option>
                    </select>
                    <button type="submit" className='bg-cyan-800 w-fit px-4 py-2 my-2 text-white font-semibold'>Add</button>
                </form>
            </div>
        </div>
    )
}