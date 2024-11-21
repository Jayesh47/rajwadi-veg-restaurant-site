import {NextResponse, NextRequest} from 'next/server';
import {verifyToken} from '@/app/apis/userValidation';
import { JwtPayload } from 'jsonwebtoken';
import Order from '@/app/apis/lib/orders';

export async function GET(req: NextRequest) {
    try {
        const userToken = req.headers.get('Authorization')?.split(" ")[1];
        if (userToken) {
            const userId = verifyToken(userToken) as JwtPayload;
            if (userId["userId"]) {
                const _orders = await Order.find({customerId: userId["userId"].toString()});
                console.log(_orders);
                return NextResponse.json({message: "success", userOrders: _orders}, {status: 200});
            }
        }else {
            return NextResponse.json({message: "No user found"}, {status: 200});
        }
    }catch(err) {
        console.log(err);
        return NextResponse.json({message: 'Internal Server Error'}, {status: 500});
    }
}