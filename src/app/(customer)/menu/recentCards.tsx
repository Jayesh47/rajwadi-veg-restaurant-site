import React from 'react';
import Image from 'next/image';

interface recents {
    thumbnail?: string
}
export default function RecentCard({ thumbnail }: recents) {
    return (
        <span className='transition hover:scale-125 w-24 md:w-32 md:mx-4 text-center'>
            <Image src={thumbnail ? thumbnail : ""} alt='product' width={900} height={300} className='rounded-3xl h-[14vh] md:h-[16vh] cursor-pointer'></Image>
            <h4>{thumbnail?.split(".")[0].slice(1)}</h4>
        </span>
    )
}