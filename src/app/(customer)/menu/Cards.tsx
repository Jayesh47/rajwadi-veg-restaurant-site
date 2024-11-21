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
        <div className="card w-[22%] my-8 h-[65vh] p-5 shadow-lg shadow-indigo-300">
            <div className="thumbnail flex justify-center">
                <span className="offer px-2 text-white font-semibold w-32 h-fit absolute ml-[13em] rotate-[45deg]">₹{discount} Off</span>
                <img src={thumbnail} alt={productName} className='h-[25vh] w-[14vw] rounded-full product-thumbnail' />
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