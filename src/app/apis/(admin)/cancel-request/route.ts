import { NextRequest, NextResponse } from 'next/server';
import Reserve from '@/app/apis/lib/reservation';

export async function GET(req: NextRequest) {
    try {
        const url = req.url;
        const bookingId = url.split("=")[1];
        if (bookingId) {
            await Reserve.findByIdAndDelete(bookingId);
            return NextResponse.json({ message: 'success' }, { status: 200 });
        } else {
        }
        return NextResponse.json({ message: "booking id is required." }, { status: 201 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "internal error occurred" }, { status: 500 });
    }
}