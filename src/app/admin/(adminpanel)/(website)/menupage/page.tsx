'use client';
import React, { useState, useEffect } from 'react';
import ViewProduct from './view_product';
import AddNewProduct from './add_new';
import api from '@/app/api';

export default function Menupage() {
    const [Products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get("/view-products");
                if (res.data) {
                    setProducts(res.data["product"].map((res: any) => ({
                        id: res["_id"],
                        _name: res["ProductName"],
                        _price: res["productPrice"]
                    })));
                }
            } catch (err) {
                console.error('Error fetching products:', err);
            }
        };

        fetchProducts();
    }, []);

    return (
        <section className="flex flex-col px-6 py-2 h-screen mt-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className='text-[36px] text-white font-semibold'>Menu Page</h1>
                <AddNewProduct />
            </div>
            <div className="flex h-[74vh] flex-col overflow-y-auto">
                {
                    Products.map((data: any) => (
                        <ViewProduct
                            key={data.id}
                            productid={data.id}
                            _name={data._name}
                            _price={data._price}
                        />
                    ))
                }
            </div>
        </section>
    );
}
