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
        <section className="mainshop my-6 md:my-9 flex flex-col md:mx-8">
            <div className="flex relative">
                <Image src={'/menu.avif'} alt="menu image" width={600} height={500} className="w-full h-[40vh]"></Image>
                <div className="flex justify-center bg-black bg-opacity-40 items-center w-full h-[40vh] absolute font-semibold text-white">
                    <h1 className="text-3xl">Home/Menu</h1>
                </div>
            </div>
            <div className="mt-8 font-semibold col-span-1">
                <ul className="hidden md:flex md:flex-wrap flex-col md:flex-row justify-between pb-2">
                    <li className="cursor-pointer text-center mb-5 md:mb-0">
                        <span className="text-xl font-bold">Royal Rajasthani</span>
                        <div className="grid grid-rows-3 gap-y-4 mt-5">
                            <span>Laal Maas</span>
                            <span>Ker Sangri</span>
                            <span>Dal-Bati Churma With Buttermilk</span>
                        </div>
                    </li>
                    <li className="cursor-pointer text-center mb-5 md:mb-0">
                        <span className="text-xl font-bold">Punjabi</span>
                        <div className="grid grid-rows-3 gap-y-4 mt-5">
                            <span>Aloo Paratha</span>
                            <span>Chole Bhature</span>
                            <span>Paneer Butter Masala</span>
                        </div>
                    </li>
                    <li className="cursor-pointer text-center mb-5 md:mb-0">
                        <span className="text-xl font-bold">Gujrati</span>
                        <div className="grid grid-rows-3 gap-y-4 mt-5">
                            <span>Dhokla</span>
                            <span>Thepla</span>
                            <span>Fafda & Jalebi</span>
                        </div>
                    </li>
                    <li className="cursor-pointer text-center mb-5 md:mb-0">
                        <span className="text-xl font-bold">South Indian</span>
                        <div className="grid grid-rows-3 gap-y-4 mt-5">
                            <span>Idli</span>
                            <span>Uttapam</span>
                            <span>Masala Dosa</span>
                        </div>
                    </li>
                    <li className="cursor-pointer text-center mb-5 md:mb-0">
                        <span className="text-xl font-bold">Chineese</span>
                        <div className="grid grid-rows-3 gap-y-4 mt-5">
                            <span>Paneer Chili</span>
                            <span>Hakka Noodles</span>
                            <span>Vegetable Manchurian</span>
                        </div>
                    </li>
                    <li className="cursor-pointer text-center mb-5 md:mb-0">
                        <span className="text-xl font-bold">Italian</span>
                        <div className="grid grid-rows-3 gap-y-4 mt-5">
                            <span>Bruschetta</span>
                            <span>Pasta Primavera</span>
                            <span>Margherita Pizza</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="grid grid-cols-9 gap-x-28 ml-4 md:ml-0 overflow-x-scroll h-44 pt-6 no-scroll my-12">
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