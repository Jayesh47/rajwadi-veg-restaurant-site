import React from 'react';
import EditButton from './editButton';
import RemoveButton from './removeButton';

interface ProductInterface {
    productid: String,
    _name: String,
    _price: String
}

export default async function ViewProduct({productid, _name, _price}:ProductInterface) {
    return (
        <div className='flex bg-white mx-4 my-4 p-2 shadow-lg justify-between'>
            <div className="product-details flex w-[75%] justify-between items-center">
                <h1 className='text-md font-semibold'>{productid}</h1>
                <h1 className='text-xl'>{_name}</h1>
                <h1 className='text-xl'>₹{_price}</h1>
            </div>
            <div className="flex justify-center items-center">
                <EditButton productId={productid.toString()} />
                <RemoveButton productId={productid.toString()} />
            </div>
        </div>
    )
}