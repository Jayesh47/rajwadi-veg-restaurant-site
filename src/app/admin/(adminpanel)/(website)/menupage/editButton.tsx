'use client'
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import api from '@/app/api';
import {toast, Toaster} from 'react-hot-toast';

export default function EditButton({ productId }: any) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState({
        thumbnail: "",
        prod_name: "",
        prod_price: "",
        prod_description: "",
        prod_discount: "",
        prod_category: "",
    });

    const [_productImgs, setProductImgs] = useState<File | null>(null);
    const [_productName, setProductName] = useState("");
    const [_productPrice, setProductPrice] = useState("");
    const [_productDiscount, setDiscount] = useState("");
    const [_productCategory, setCategory] = useState("");
    const [_productDescription, setDescription] = useState("");

    const handleView = async () => {
        const res = await api.get("/view-products", { params: { prodId: productId } });
        const _data = res.data["product"];
        if (_data) {
            setProducts({
                thumbnail: _data["productThumbnail"],
                prod_name: _data["ProductName"],
                prod_price: _data["productPrice"],
                prod_description: _data["productDescription"],
                prod_discount: _data["productDiscount"],
                prod_category: _data["productCategory"]
            });
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const _form = new FormData();
        if (_productImgs) {
            _form.append('_productimg', _productImgs);
            console.log(_productImgs);
        } else {
            console.log("No file selected.");
        }
        if (_productName) _form.append('_productname', _productName);
        if (_productPrice) _form.append('_productprice', _productPrice);
        if (_productDiscount) _form.append('_productdiscount', _productDiscount);
        if (_productCategory) _form.append('_productcategory', _productCategory);
        if (_productDescription) _form.append('_productdescription', _productDescription);
        _form.append('productid', productId);

        api.post("/update-product", _form, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then((res) => {
                if (res.data["message"] === "success") {
                    toast.success("Product Updated Successfully.");
                }
            })
            .catch((err) => {
                console.error("Error while submitting:", err);
            });
    }

    return (
        <div>
            <Toaster />
            <button className="mr-3 hover:underline hover:text-blue-500 font-semibold" onClick={() => (setIsModalOpen(true), handleView())}>
                Edit Now <FontAwesomeIcon icon={faPen} className='text-sm' />
            </button>

            <form method="post" encType='multipart/form-data' onSubmit={handleSubmit} className={`flex flex-col absolute w-3/5 left-[12em] h-[85vh] top-7 justify-between shadow-2xl shadow-gray-600 rounded-2xl p-3 bg-white transition-transform ${isModalOpen ? '-translate-y-[0%]' : '-translate-y-[115%]'} duration-[8] easy-in-out`}>
                <button type='button' className='absolute right-5 font-semibold' onClick={() => setIsModalOpen(false)}>X</button>

                <label htmlFor="product-img" className='cursor-pointer w-fit'>
                    <img src={products.thumbnail} width={1500} height={1500} alt='product-img' className='w-fit h-40 rounded-2xl shadow-lg shadow-cyan-300' />
                    <span>{_productImgs ? _productImgs.name : "Upload new image"}</span>
                </label>

                <input type='file' name="product-img" id='product-img' onChange={(e) => {if (e.target.files) setProductImgs(e.target.files[0])}} />
                <input type="text" name="product-name" className="border rounded-full px-4 py-2" placeholder='Product Name' defaultValue={products.prod_name} onChange={(e) => setProductName(e.target.value)} />
                <input type="text" name="product-price" className="border rounded-full px-4 py-2" placeholder='product price' defaultValue={products.prod_price} onChange={(e) => setProductPrice(e.target.value)} />
                <input type="text" name="product-discount" className="border rounded-full px-4 py-2" placeholder='product discount' defaultValue={products.prod_discount} onChange={(e) => setDiscount(e.target.value)} />
                <input type="text" name="product-description" className="border rounded-full px-4 py-2" placeholder='product description' defaultValue={products.prod_description} onChange={(e) => setDescription(e.target.value)} />

                <select name="product-category" defaultValue={products.prod_category} className='border px-3 py-2 rounded-3xl' onChange={(e) => setCategory(e.target.value)}>
                    <option value="Rajasthani">Rajasthani</option>
                    <option value="Punjabi">Punjabi</option>
                    <option value="Gujarati">Gujarati</option>
                    <option value="South Indian">South Indian</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Italian">Italian</option>
                </select>

                <button type='submit' className="bg-blue-700 text-white w-fit px-4 py-2 font-semibold rounded-md">Change</button>
            </form>
        </div>
    );
}
