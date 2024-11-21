import { NextRequest, NextResponse } from 'next/server';
import Reserve from '@/app/apis/lib/reservation';
import { verifyToken } from '../../userValidation';

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const auth = req.headers.get("Authorization");
        if (auth) {
            const user = verifyToken(auth);
            if (user && typeof user === 'object' && user["userId"].length > 0) {
                const reserve = new Reserve({
                    reservationTime: data["timeForBooking"],
                    reservationType: data["reservation"],
                    customerId: user["userId"].toString(),
                    customerName: data["username"],
                    customerPhone: data["userphone"],
                    customerEmail: data["useremail"],
                });
                reserve.save();
                return NextResponse.json({ message: "success" }, { status: 200 });
            } else {
                return NextResponse.json({ message: "not permit" }, { status: 401 });
            }
        } else {
            return NextResponse.json({ message: "not permit" }, { status: 401 });
        }
    } catch (err) {
        return NextResponse.json({ message: "Internal Error" }, { status: 500 });
    }
}