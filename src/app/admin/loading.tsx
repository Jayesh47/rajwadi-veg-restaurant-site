'use client';
import React from 'react';
import Image from 'next/image';

const Loading = () => {
    return (
        <div className="flex flex-col w-full h-screen justify-center items-center bg-gray-300">
            <Image src="/logo.png" alt="Rajwadi Restaurant" width={150} height={100} className='mb-4' />
            <p className='font-semibold font-mono text-xl'>Loading...</p>
        </div>
    );
};

export default Loading;
