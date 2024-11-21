import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/app/apis/userValidation';
import Cart from '../../lib/cart';
import { JwtPayload } from 'jsonwebtoken';

export async function PUT(res: NextRequest) {
    try {
        const data = await res.json();
        const userAuth = res.headers.get("Authorization");
        if (userAuth) {
            const userId = verifyToken(userAuth) as JwtPayload;
            const _cart = new Cart({
                _productId: data["_prodId"],
                _productName: data["_prodName"],
                _productPrice: data["_prodPrice"],
                _productImg: data["_prodImg"],
                _customerId: userId["userId"]
            });
            _cart.save();
            return NextResponse.json({ message: "Success" }, { status: 200 });
        }else {
            return NextResponse.json({ message: "unknown user" }, { status: 200 });
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Internal Error Occurred!" }, { status: 500 });
    }
}