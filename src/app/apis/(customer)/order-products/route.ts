import { NextRequest, NextResponse } from 'next/server';
import Order from '@/app/apis/lib/orders'; 
import {verifyToken} from '@/app/apis/userValidation';
import { JwtPayload } from 'jsonwebtoken';

export async function POST(req: NextRequest) {
    try {
        const data = await req.json(); // Get the product data from the request
        const userToken = req.headers.get('Authorization')?.split(" ")[1];
        if (userToken) {
            const userId = verifyToken(userToken) as JwtPayload;
            // Assuming data contains an array of products
            const products = data.products.map((product:any) => ({
                ...product, // Spread the product details
                customerId: userId["userId"]
            }));
            
            // Bulk insert the products into the database
            const result = await Order.insertMany(products);   
            return NextResponse.json({ message: "success" }, { status: 200 });
        }else {
            return NextResponse.json({message: "user not found!"}, {status: 200});
        }
    } catch (err) {
        console.error("Error saving products:", err);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
