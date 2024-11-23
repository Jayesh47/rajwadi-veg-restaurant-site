import React from "react";
import Image from "next/image";

export default function Events() {
    return (
        <section className="mb-9">
            <div className="flex flex-col justify-center items-center my-9 mx-7">
                <h1 className="text-[1.2em] italic font-serif text-slate-400 font-[600]">Arrangements and Arrange</h1>
                <h3 className="text-[1.8em] font-[700]">Private Events</h3>
                <p className="md:w-3/5 text-xl text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis laborum perspiciatis amet in nulla necessitatibus corrupti porro laboriosam id, quas cum. Neque, vitae? Dolorem esse mollitia ut reprehenderit cupiditate odio ex qui explicabo vitae nostrum. Reprehenderit libero quam deserunt vero.</p>
            </div>
            <div className="arrangements flex flex-wrap w-[80%] mb-9 m-auto justify-between">
                <div className="text-center p-4 cursor-pointer">
                    <div className="arrange-img">
                        <Image src={"/poster.jpg"} width={400} height={200} alt="rich flavor" className="w-[20rem] h-[35vh]" />
                    </div>
                    <div className="description">
                        <h1 className="text-[1.7em] font-serif font-[600]">Rich Flavor</h1>
                    </div>
                </div>
                <div className="text-center p-4 cursor-pointer">
                    <div className="arrange-img">
                        <Image src={"/poster-3.jpg"} width={400} height={200} alt="rich flavor" className="w-[20rem] h-[35vh]" />
                    </div>
                    <div className="description">
                        <h1 className="text-[1.7em] font-serif font-[600]">Served With Love</h1>
                    </div>
                </div>
                <div className="text-center p-4 cursor-pointer">
                    <div className="arrange-img">
                        <Image src={"/poster1.jpg"} width={400} height={200} alt="rich flavor" className="w-[20rem] h-[35vh]" />
                    </div>
                    <div className="description">
                        <h1 className="text-[1.7em] font-serif font-[600]">Enjoy the Fresh</h1>
                    </div>
                </div>
            </div>
            <div className="party">
                <div className="party-banner flex justify-center">
                    <Image src={"/delicates.jpg"} className="md:w-[85%] h-[50vh]" width={1000} height={200} alt="party"></Image>
                    <div className="flex md:w-[85%] h-[50vh] backdrop-brightness-50 absolute m-auto flex-col items-center justify-center">
                        <h2 className="text-white text-center md:text-left text-[48px] font-[700]">Need Your Best Party</h2>
                        <h2 className="text-[38px] text-rose-300 font-[700] font-serif italic">Events Rooms</h2>
                    </div>
                </div>
            </div>
            <div className="group-dinner flex flex-wrap md:flex-nowrap w-[70%] m-auto my-9">
                <div className="left">
                    <Image src={"/poster-3.jpg"} className="w-[100%] h-[30vh] md:w-[50em] md:h-[50vh]" width={1000} height={200} alt="Group Dinner"></Image>
                </div>
                <div className="right md:w-[50em] flex flex-col justify-around md:mx-9">
                    <h3 className="font-serif italic text-[25px] text-slate-400">Group Dinner</h3>
                    <h3 className="text-[35px]">Restaurant For Group</h3>
                    <hr />
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At quasi voluptatem error corrupti accusamus molestiae repellat iste sunt deleniti expedita laudantium in praesentium ad minima.</p>
                    <button className="btn py-2 px-4 bg-[#c59d5f] text-white w-fit border-[#c59d5f] transition-all ease-in-out border-2 hover:bg-white hover:text-[#c59d5f]">Book Now</button>
                </div>
            </div>
            <div className="group-dinner flex flex-wrap md:flex-nowrap w-[70%] m-auto my-9 flex-row-reverse">
                <div className="left">
                    <Image src={"/delicates.jpg"} className="w-full h-[30vh] md:w-[50em] md:h-[50vh]" width={1000} height={200} alt="Group Dinner"></Image>
                </div>
                <div className="right md:w-[50em] flex flex-col md:items-end justify-around md:mx-9">
                    <h3 className="font-serif italic text-[25px] text-slate-400">Playing Music</h3>
                    <h3 className="text-[35px]">New Ideas Each Time</h3>
                    <hr />
                    <p className="md:text-right">Lorem ipsum dolor sit amet, consectetur adipisicing elit. At quasi voluptatem error corrupti accusamus molestiae repellat iste sunt deleniti expedita laudantium in praesentium ad minima, unde, dicta.</p>
                    <button className="btn py-2 px-4 bg-[#c59d5f] text-white w-fit border-[#c59d5f] transition-all ease-in-out border-2 hover:bg-white hover:text-[#c59d5f]">Book Now</button>
                </div>
            </div>
            <div className="group-dinner flex flex-wrap md:flex-nowrap w-[70%] m-auto my-9">
                <div className="left">
                    <Image src={"/poster.jpg"} className="w-full h-[30vh] md:w-[50em] md:h-[50vh]" width={1000} height={200} alt="Group Dinner"></Image>
                </div>
                <div className="right md:w-[50em] flex flex-col justify-around md:mx-9">
                    <h3 className="font-serif italic text-[25px] text-slate-400">Candle Night Dinner</h3>
                    <h3 className="text-[35px]">Special Dishes & Drinks</h3>
                    <hr />
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At quasi voluptatem error corrupti accusamus molestiae repellat iste sunt deleniti expedita laudantium in praesentium ad minima.</p>
                    <button className="btn py-2 px-4 bg-[#c59d5f] text-white w-fit border-[#c59d5f] transition-all ease-in-out border-2 hover:bg-white hover:text-[#c59d5f]">Book Now</button>
                </div>
            </div>
        </section>
    );
}