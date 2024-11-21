import React from 'react';
import Image from 'next/image';

interface recents {
    thumbnail?: string
}
export default function RecentCard({ thumbnail }: recents) {
    return (
        <span className='transition hover:scale-125 max-w-32'>
            <Image src={thumbnail ? thumbnail : ""} alt='product' width={900} height={300} className='rounded-3xl h-[18vh] w-28 cursor-pointer'></Image>
            <h4>{thumbnail?.split(".")[0].slice(1)}</h4>
        </span>
    )
}