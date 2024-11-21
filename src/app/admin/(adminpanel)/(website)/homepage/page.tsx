import React from 'react';
import BannersManagement from './banners-manage';
import HistoryManage from './history';
import Services from './services';

export default function Homepage() {
    return (
        <section className="flex flex-col px-2 h-screen">
            <h1 className='text-[38px] text-gray-100'>Homepage</h1>
            <BannersManagement />
            <HistoryManage />
            <Services />
        </section >
    )
}