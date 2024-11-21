import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default function SuccessPage() {
    return (
        <div className="success my-8 flex flex-col justify-center items-center">
            <div className="flex justify-center items-center h-[25vh] w-[20%]">
                <FontAwesomeIcon icon={faCheckCircle} className='absolute text-[10em] text-green-600 success-img' />
            </div>
            <h1 className='font-semibold text-2xl my-5 text-green-500 '>Yayyy! Order Recieved Successfully.</h1>
            <h1 className='font-semibold text-2xl text-green-500'>Thankyou For Choosing Rajwadi Restro.</h1>
        </div>
    )
}