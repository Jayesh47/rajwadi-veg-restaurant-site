'use client';
import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import ProductCards from "./Cards";
import RecentCard from "./recentCards";
import fetchProducts from './fetchProduct';

export default function Shop() {
    const category = ["/Ker Sangri.jpeg", "/paneer-butter-milk.jpg", "/dhokla.jpg", "/dosa.jpg", "/manchuriyan.jpg", "/margreta pizza.jpg", "/laal-maas.jpg", "/aloo-paratha.jpg", "/thepla.jpg"]
    const [Product, setProduct] = useState([]);

    const handleProducts = async () => {
        const res = await fetchProducts();
        setProduct(res);
    }
    useEffect(() => { handleProducts(); }, []);
    const _products = useMemo(() => Product, [Product]);

    return (
        <section className="mainshop my-9 flex flex-col mx-8">
            <div className="flex relative">
                <Image src={'/menu.avif'} alt="menu image" width={600} height={500} className="w-full h-[40vh]"></Image>
                <div className="flex justify-center bg-black bg-opacity-40 items-center w-full h-[40vh] absolute font-semibold text-white">
                    <h1 className="text-3xl">Home/Menu</h1>
                </div>
            </div>
            <div className="mt-8 font-semibold col-span-1">
                <ul className="border-b border-black grid grid-cols-6 pb-2">
                    <li className="cursor-pointer text-center">Royal Rajasthani</li>
                    <li className="cursor-pointer text-center">Punjabi</li>
                    <li className="cursor-pointer text-center">Gujrati</li>
                    <li className="cursor-pointer text-center">South Indian</li>
                    <li className="cursor-pointer text-center">Chineese</li>
                    <li className="cursor-pointer text-center">Italian</li>
                </ul>
                <div className="grid grid-cols-6 mt-3 text-center">
                    <div className="grid grid-rows-3">
                        <span>Ker Sangri</span>
                        <span>Laal Maas</span>
                        <span>Dal-Bati Churma With Buttermilk</span>
                    </div>
                    <div className="grid grid-rows-3">
                        <span>Paneer Butter Masala</span>
                        <span>Chole Bhature</span>
                        <span>Aloo Paratha</span>
                    </div>
                    <div className="grid grid-rows-3">
                        <span>Dhokla</span>
                        <span>Thepla</span>
                        <span>Fafda & Jalebi</span>
                    </div>
                    <div className="grid grid-rows-3">
                        <span>Masala Dosa</span>
                        <span>Idli</span>
                        <span>Uttapam</span>
                    </div>
                    <div className="grid grid-rows-3">
                        <span>Vegetable Manchurian</span>
                        <span>Hakka Noodles</span>
                        <span>Paneer Chili</span>
                    </div>
                    <div className="grid grid-rows-3">
                        <span>Margherita Pizza</span>
                        <span>Pasta Primavera</span>
                        <span>Bruschetta</span>
                    </div>
                </div>
            </div>
            <div className="flex my-6 relative overflow-x-auto no-scrollbar text-center font-semibold h-[25vh] py-6 justify-around">
                {
                    category.map((_val, i) => (
                        <RecentCard thumbnail={_val} key={i} />
                    ))
                }
            </div>
            <div className="flex justify-evenly flex-wrap">
                {
                    _products.map((_prod, i) => (
                        <ProductCards
                            thumbnail={_prod["thumbnail"]}
                            productName={_prod["_name"]}
                            productDesc={_prod["_description"]}
                            productPrice={_prod["_price"]}
                            discount={_prod["_discount"]} productId={_prod["productId"]} key={i} />
                    ))
                }
            </div>
        </section>
    )
}