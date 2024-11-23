'use client';
import api from "@/app/api";
import React, { useState } from "react";
import { toast, Toaster } from 'react-hot-toast';

const checkTime = (_time: String) => {
    const _date = _time.split(" ")[0].split("/")[0];
    const _mon = _time.split(" ")[0].split("/")[1];
    const _year = _time.split(" ")[0].split("/")[2];
    const _Date = new Date();

    if (Number(_year) < _Date.getFullYear()) {
        toast.error("invalid year");
    } else if (Number(_mon) < _Date.getMonth() + 1) {
        toast.error("invalid month");
    } else if (Number(_mon) === _Date.getMonth() + 1 && Number(_date) < _Date.getDate()) {
        toast.error("invalid date");
    } else {
        return true;
    }
}

export default function Reservation() {
    const [_time, setTime] = useState("");
    const [noOfPeople, setPeople] = useState("");
    const [userName, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [reservation, setReservation] = useState("");
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = sessionStorage.getItem("userToken")
        const _form = new FormData();
        if (checkTime(_time)) {
            _form.append("timeForBooking", _time);
            _form.append("noOfPeople", noOfPeople);
            _form.append("username", userName);
            _form.append("userphone", phone);
            _form.append("useremail", email);
            _form.append("reservation", reservation);
            api.post("/user-reservation", _form, { headers: { 'Authorization': token } }).then((res) => {
                if (res.data["message"] === "success") {
                    toast.success("Reservation request is send successfully.");
                } else {
                    toast.error("Sorry, Login Required!");
                }
            }).catch((err) => toast.error("Sorry, Login Required!"));
        }
    }
    return (
        <section className="reservation m-9">
            <Toaster />
            <div className="flex flex-col-reverse md:flex-row mx-2 md:mx-9 my-9">
                <div className="header flex flex-col md:w-3/5 justify-evenly items-center mt-4 md:mt-0 md:mr-[-5em] md:ml-[5em]">
                    <h2 className="font-serif italic font-[600] text-[20px] text-slate-500">Make A Reservation</h2>
                    <h2 className="font-sans font-[800] text-[30px] text-center md:text-right">Private Dining & Events</h2>
                    <p className="font-sans font-[600] text-[16px] text-center">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus minima voluptates harum iste eligendi quae, nesciunt reiciendis quisquam amet doloremque tempora suscipit consectetur distinctio consequuntur fugiat, explicabo at sint ipsum!
                    </p>
                    <span className="font-[700]">Reserved By Phone</span>
                    <span className="font-mono text-red-500 font-[600] text-[26px]">+91 12345 67890</span>
                </div>
                <div className="banner ml-0 md:ml-[10em] w-full md:w-[40%]">
                    <div className="banner bg-black p-4 flex flex-col w-full md:w-[70%] h-[50vh]">
                        <div className="frame flex flex-col items-center text-white border-2 border-white h-[100%] p-5 border-dashed">
                            <img src="/opentiming.png" alt="open time" width={200} height={200} />
                            <hr className="w-2/5 border-2" />
                            <h3 className="font-600 text-orange-300 mt-5 text-[20px] ">Monday - Friday</h3>
                            <span className="text-[16px]">7 am - 10 pm</span>
                            <span className="text-[16px]">(Breakfast, Lunch, Dinner)</span>
                            <h3 className="font-600 text-orange-300 mt-5 text-[20px] ">Saturday - Sunday</h3>
                            <span className="text-[16px]">8 am - 11 pm</span>
                            <span className="text-[16px]">(Breakfast, Lunch, Dinner)</span>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="border-slate-400 w-4/5 m-auto" />
            <div className="flex flex-col items-center my-9 py-4">
                <h2 className="font-serif italic text-[20px] text-slate-500">Online Reservation</h2>
                <h2 className="font-sans font-[800] text-[30px] text-center md:text-right">No Need To Wait For Table</h2>
                <span className="font-[950] text-slate-500">~~~~~~~~~</span>
            </div>

            <form method="post" className="grid md:grid-cols-3 grid-rows-3 font-[600] gap-y-[3em] gap-4 w-full md:w-4/5 font-sans md:h-[50vh] m-auto" onSubmit={handleSubmit}>
                <label htmlFor="time-of-book">
                    <span className="text-slate-400 font-bold">Date & Time -</span>
                    <input type="datetime" name="resvTime" id="time-of-book" className="text-md w-full border-b-2 border-black outline-none hover:border-[#c59d5f]" placeholder="your preferred Time: (dd/mm/yyyy hh:mm PM/AM)" onChange={(e) => setTime(e.target.value)} required />
                </label>
                <label htmlFor="no-of-people">
                    <span className="text-slate-400 font-bold">Number of People</span>
                    <select name="no-of-people" id="no-of-people" className="text-md w-full border-b-2 border-black outline-none hover:border-[#c59d5f]" onChange={(e) => { setPeople(e.target.value) }} required>
                        <option value="">--- Select ---</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                    </select>
                </label>
                <label htmlFor="bookType">
                    <span className="text-slate-400 font-bold">What You Want To Book?</span>
                    <select name="bookType" id="bookType" className="text-md w-full border-b-2 border-black outline-none hover:border-[#c59d5f]" onChange={(e) => { setReservation(e.target.value) }} required>
                        <option value="">---- Select -----</option>
                        <option value="group dinner">Group Dinner</option>
                        <option value="dinner with music">Dinner With Music</option>
                        <option value="candle night">Candle Night Dinner</option>
                        <option value="full restaurant">Book Full Restaurant</option>
                    </select>
                </label>
                <label htmlFor="customer-name">
                    <span className="text-slate-400 font-bold">Name</span>
                    <input type="text" name="customer-name" id="customer-name" className="text-md w-full border-b-2 border-black outline-none hover:border-[#c59d5f]" onChange={(e) => { setName(e.target.value) }} required />
                </label>
                <label htmlFor="phone">
                    <span className="text-slate-400 font-bold">Phone Number</span>
                    <input type="text" name="phone" id="phone" maxLength={12} className="text-md w-full border-b-2 border-black outline-none hover:border-[#c59d5f]" onChange={(e) => { setPhone(e.target.value) }} required />
                </label>
                <label htmlFor="Email">
                    <span className="text-slate-400 font-bold">Email -</span>
                    <input type="email" name="Email" id="Email" className="text-md w-full border-b-2 border-black outline-none hover:border-[#c59d5f]" onChange={(e) => { setEmail(e.target.value) }} required />
                </label>
                <button type="submit" className="relative inline-block px-4 w-fit py-2 h-fit text-white uppercase text-sm tracking-wider font-medium overflow-hidden transition-all duration-300 group">
                    <span className="absolute inset-0 bg-blue-600 z-10"></span>
                    <span className="absolute inset-0 bg-blue-800 w-0 transition-all duration-300 group-hover:w-full z-10"></span>
                    <span className="relative z-10">Proceed To Pay</span>
                </button>
            </form>
        </section>
    )
}