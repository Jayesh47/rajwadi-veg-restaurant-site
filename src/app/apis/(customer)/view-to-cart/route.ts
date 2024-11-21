import {NextRequest, NextResponse} from 'next/server';
import Cart from '../../lib/cart';
import {verifyToken} from '@/app/apis/userValidation';
import { JwtPayload } from 'jsonwebtoken';

export async function GET(req: NextRequest) {
    try {
        const userAuth = req.headers.get('Authorization');
        if (userAuth) {
            const userId = verifyToken(userAuth) as JwtPayload;
            const data = await Cart.find({_customerId: userId["userId"]});
            const _resData = data.map((_item) => {
                return {
                    _prodImg: _item["_productImg"],
                    _prodName: _item["_productName"],
                    _prodPrice: _item["_productPrice"],
                    _prodId: _item["_productId"],
                }
            });
            return NextResponse.json({message: _resData}, {status: 200});
        }else {
            return NextResponse.json({message: 'unknown user'}, {status: 200});
        }
    }catch (err) {
        return NextResponse.json({message: "Internal Server Error"}, {status: 500});
    }
}