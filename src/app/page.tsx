'use client';
import React, { Suspense } from 'react';
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "./(customer)/page";
import Footer from "./(customer)/header/footer";
import api from "./api";
import Carousel from "./carousel";
import Loading from './loading';

export default function Home() {
  const [banners, setBanner] = useState<any[]>([]);
  const [isUser, setUser] = useState(false);
  const [service, setService] = useState({ thumbnail: "", description: "" });
  const [history, setHistory] = useState({ thumbnail: "", description: "" });
  const [loader, setLoader] = useState<boolean>(true);

  const handleRegisterBtn = () => {
    const _user = sessionStorage.getItem("userToken");
    if (_user) {
      setUser(true);
    } else {
      setUser(false);
    }
  }
  const handleAllDetails = async () => {
    const res = await api.get("/load-homepage");
    const homepage = res.data;
    if (homepage[0]["banner"] !== undefined || homepage[1]["banner"] !== undefined) {
      setLoader(false);
      setBanner(homepage[2]["banner"]);
      setHistory({ thumbnail: homepage[0]["banner"], description: homepage[0]["description"] });
      setService({ thumbnail: homepage[1]["banner"], description: homepage[1]["description"] });
    }
  }

  useEffect(() => {
    handleRegisterBtn();
    handleAllDetails();
  }, []);

  return ([
    <Navbar />,
    (loader ? <Loading /> : [
      <section>
        <div className="h-screen relative">
          <Carousel banner={banners} />
        </div>
        <div className="absolute top-[15vh] flex flex-col text-center w-full h-[95%] justify-center items-center backdrop-brightness-50">
          <h1 className="text-[56px] font-serif text-white">Best food for your taste</h1>
          <h1 className="text-[24px] font-serif text-white">Discoverable delectable cuisine and unforgattable moments in our welcoming, culinary haven.</h1>
        </div>
        <main className="mainpage flex flex-col mt-8 bg-white">
          <div className="flex flex-col items-center bg-orange-200 p-5 justify-center rounded-tr-full rounded-bl-full h-[45vh] w-[90%] m-auto">
            <Image src={`/uploads/${history.thumbnail}`} alt="history" width={200} height={200} className="w-[180px] h-[180px] absolute mt-[-18em] left-[2em] rounded-full"></Image>
            <h3 className="text-[40px] font-semibold">OUR HISTORY</h3>
            <p className="text-center w-4/5 mt-6">{history.description}</p>
            <Link href={"/about"} className="py-2 px-4 rounded font-semibold my-6 text-black bg-red-600 text-white shadow-lg shadow-rose-400 transition-all easy-in delay-150 hover:bg-red-700">Learn More</Link>
          </div>

          <div className="flex flex-col items-center bg-orange-200 p-5 justify-center rounded-tl-full rounded-br-full h-[45vh] w-[90%] mt-12 m-auto">
            <Image src={`/uploads/${service.thumbnail}`} alt="history" width={200} height={200} className="w-[180px] h-[180px] absolute mt-[-18em] right-[1.8em] rounded-full"></Image>
            <h3 className="text-[40px] font-semibold">OUR SERVICES</h3>
            <p className="text-center w-4/5 mt-6">{service.description}</p>
            <Link href={"/about"} className="py-2 px-4 rounded font-semibold my-6 text-black bg-red-600 text-white shadow-lg shadow-rose-400 transition-all easy-in delay-150 hover:bg-red-700">Learn More</Link>
          </div>

          <div className="flex mt-9 mb-9 justify-center">
            <Image src={"/poster.jpg"} alt="..." width={1000} height={200} className="w-[80%] h-[60vh]"></Image>
            <div className="absolute flex flex-col backdrop-brightness-[0.3] w-[80%] h-[60vh] justify-center items-center">
              <h1 className="text-[3.6em] text-white">Need a Quality & Taste Improve?</h1>
              <h3 className="text-[2em] text-white my-8">Choose Rajwadi Thal at Royal Rajwadi Resaurant.</h3>
              {
                isUser ? (
                  <Link href={"/menu"} className="relative inline-block px-2 text-xl w-[16vw] text-center py-3 text-white uppercase text-sm tracking-wider font-semibold overflow-hidden transition-all duration-300 group">
                    <span className="absolute inset-0 bg-violet-500 -z-10"></span>
                    <span className="absolute inset-0 bg-rose-600 w-0 transition-all duration-300 group-hover:w-full -z-10"></span>
                    Book Order
                  </Link>
                ) : (
                  <Link href={"/register"} className="relative inline-block px-2 text-xl w-[16vw] text-center py-3 text-white uppercase text-sm tracking-wider font-semibold overflow-hidden transition-all duration-300 group">
                    <span className="absolute inset-0 bg-violet-500 -z-10"></span>
                    <span className="absolute inset-0 bg-rose-600 w-0 transition-all duration-300 group-hover:w-full -z-10"></span>
                    Register Now
                  </Link>
                )
              }
            </div>
          </div>
        </main>
      </section>]),
    <Footer />
  ]);
}