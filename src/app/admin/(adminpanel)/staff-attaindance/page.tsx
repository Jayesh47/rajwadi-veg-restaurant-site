import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Filter from './filter';

export default function StaffAttaindance() {
    return (
        <section className='p-4 h-[100vh]'>
            <h1 className='text-white text-3xl font-bold'>Staff Attaindance</h1>
            <Filter />
            <div className="grid grid-cols-6 my-5 font-semibold text-white text-xl text-center border-b-2 pb-4">
                <h3>Date</h3>
                <h3>Employee Id</h3>
                <h3>Employee Name</h3>
                <h3>Role</h3>
                <h3>Absent/Present</h3>
                <h3>Leave</h3>
            </div>
            <div className='max-h-[75vh] overflow-auto'>
                <div className="grid grid-cols-6 bg-gray-100 text-center">
                    <p>01/11/2024</p>
                    <p>1234567890123456</p>
                    <p>Joe</p>
                    <p>Manager</p>
                    <p>Present</p>
                    <p><FontAwesomeIcon icon={faMinus} /></p>
                </div>
                <div className="grid grid-cols-6 bg-gray-100 text-center">
                    <p>01/11/2024</p>
                    <p>1234567890123456</p>
                    <p>Joe</p>
                    <p>Manager</p>
                    <p>Present</p>
                    <p><FontAwesomeIcon icon={faMinus} /></p>
                </div>
            </div>
        </section>
    )
}