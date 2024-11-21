import { NextRequest, NextResponse } from 'next/server';
import Cart from '@/app/apis/lib/cart';
import {verifyToken} from '@/app/apis/userValidation';
import { JwtPayload } from 'jsonwebtoken';

export async function DELETE(req: NextRequest) {
    try {
        const prodId = req.nextUrl.searchParams.get('prodId');
        const token = req.headers.get("Authorization")
        if (token) {
            const userId = verifyToken(token) as JwtPayload;
            
            if (!prodId) {
                return NextResponse.json({ message: "No product found" }, { status: 400 });
            }
            
            await Cart.findOneAndDelete({_productId: prodId, _customerId: userId["userId"]});
            
            return NextResponse.json({ message: "success" }, { status: 200 });
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Internal Server Error!" }, { status: 500 });
    }
}
