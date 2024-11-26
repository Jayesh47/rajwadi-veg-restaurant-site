import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import OrderBtn from './orderbtn';

interface ProductDetail {
    thumbnail?: string;
    productName?: string;
    productPrice?: string;
    productDesc?: string;
    discount?: string;
    productId?: string;
}

export default function ProductCards({ thumbnail, productName, productPrice, productDesc, discount, productId }: ProductDetail) {
    return (
        <div className="card w-4/5 md:w-[22%] my-8 h-[65vh] p-5 shadow-lg shadow-indigo-300 border">
            <div className="thumbnail flex justify-center">
                <img src={thumbnail} alt={productName} className='h-[25vh] w-[50vw] -mr-10 md:w-[12vw] rounded-full product-thumbnail' />
                <span className="offer block w-32 -mr-[5.6em] rotate-45 text-white font-semibold">₹{discount} Off</span>
            </div>
            <div className="grid grid-rows-1 gap-3 mt-3">
                <div className='grid h-[25vh]'>
                    <h1 className="text-2xl font-semibold text-center">{productName}</h1>
                    <h2 className="text-md text-center"><FontAwesomeIcon icon={faStar} className='text-yellow-500' /> 4.5</h2>
                    <h2 className="text-xl text-center">Items At ₹{productPrice}</h2>
                    <p className='line-clamp-2 text-center'>{productDesc}</p>
                </div>
                <div className="h-fit flex justify-center">
                    <OrderBtn
                        thumbnail={thumbnail}
                        productName={productName}
                        productPrice={productPrice}
                        productId={productId}
                    />
                </div>
            </div>
        </div>
    );
}