'use client';
import React from "react";
import { useRouter } from "next/navigation";

export default function About() {
    const navigate = useRouter();
    return (
        <div className="flex flex-col justify-center bg-white">
            <div className="container max-w-5xl mx-auto p-4 md:p-6 lg:p-12">
                <div className="flex flex-col justify-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">About Rajwadi Restaurant</h1>
                    <p className="text-lg mb-6">
                        Welcome to Rajwadi Restaurant, where the flavors of India come alive in every bite. Our story began with a passion for serving authentic Indian cuisine in a warm and inviting atmosphere.
                        Over the years, Rajwadi Restro has grown from a small local restaurant into a popular dining destination, known for its impeccable service and high-quality vegetarian food. The menu expanded to include a variety of cuisines such as Punjabi, Gujarati, South Indian, Italian, and Chinese, while still preserving the essence of Indian culture in every dish.
                        <br /><br />
                        At Rajwadi Restro, our commitment to quality service and culinary excellence ensures that every guest leaves with a satisfied palate and a smile on their face. We look forward to serving you and making every dining experience a memorable one. Our dedicated team will work with you to create a customized menu that perfectly suits your preferences and requirements.
                    </p>
                </div>
                <div className="flex flex-wrap justify-center mb-12">
                    <img
                        src="/internal-rajwadi.jpg"
                        alt="Rajwadi Restaurant Exterior"
                        className="w-full md:w-1/2 lg:w-1/3 mb-4"
                    />
                    <img
                        src="/history.jpg"
                        alt="Rajwadi Restaurant Interior"
                        className="w-full md:w-1/2 lg:w-1/3 mb-4"
                    />
                </div>
                <div className="flex flex-col justify-center mb-12">
                    <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                    <p className="text-lg mb-6">
                        At Rajwadi Restaurant, we're committed to serving the highest quality Indian cuisine, made with love and care, in a warm and welcoming environment. We strive to provide exceptional service, ensuring every guest feels like family.
                    </p>
                </div>
                <div className="flex flex-wrap justify-center mb-12">
                    <div className="w-full md:w-1/2 lg:w-1/3 mb-4 md:mr-16">
                        <img src={"/cheff.avif"} width={200} height={200} alt="cheff" className="md:h-[28vh] w-full md:w-3/5 h-[50vh]" />
                        <h3 className="text-xl font-bold mb-2">Our Chef</h3>
                        <p className="text-lg mb-6">
                            Meet our head chef, Lakshyraj bhaiya, who brings over 10 years of experience in Indian cuisine to our kitchen. With a passion for innovation and tradition, Chef Lakshyraj bhaiya crafts dishes that delight the senses.
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/3 mb-4">
                        <img src={"/team.jpg"} width={200} height={200} alt="cheff" className="md:h-[28vh] md:w-3/5 w-full md:w-fit" />
                        <h3 className="text-xl font-bold mb-2">Our Team</h3>
                        <p className="text-lg mb-6">
                            Our team is dedicated to providing exceptional service, ensuring every guest feels welcome and cared for. From our friendly servers to our skilled kitchen staff, we're a family dedicated to serving you.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col justify-center mb-12">
                    <h2 className="text-2xl font-bold mb-4">Awards and Recognition</h2>
                    <ul className="list-none mb-6">
                        <li className="mb-2">
                            <i className="fas fa-trophy text-orange-500 mr-2" />
                            Winner of the 2022 Best Indian Restaurant Award
                        </li>
                        <li className="mb-2">
                            <i className="fas fa-trophy text-orange-500 mr-2" />
                            Featured in the 2022 edition of the Indian Restaurant Guide
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col justify-center">
                    <button onClick={() => navigate.push('/reservation')} className="relative inline-block px-4 mx-auto md:mx-1 w-fit py-2 text-white uppercase text-sm tracking-wider font-medium overflow-hidden transition-all duration-300 group">
                        <span className="absolute inset-0 bg-blue-600 z-10"></span>
                        <span className="absolute inset-0 bg-blue-800 w-0 transition-all duration-300 group-hover:w-full z-10"></span>
                        <span className="relative z-10">Make Your Reservation</span>
                    </button>
                </div>
            </div>
        </div>
    );
}