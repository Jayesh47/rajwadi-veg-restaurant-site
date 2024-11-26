import { NextRequest, NextResponse } from 'next/server';
import Order from '@/app/apis/lib/orders'; // Assuming this is your Mongoose model
import { Document } from 'mongoose'; // Import Mongoose's Document type

interface OrderSchema {
    createAt: Date;
    orderStatus: string;
}

type OrderType = OrderSchema & Document;

export async function PUT(req: NextRequest) {
    try {
        const data = await req.json();

        const startOfDay = new Date();
        startOfDay.setUTCHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setUTCHours(23, 59, 59, 999);

        if (data["custId"]) {
            const _data: OrderType[] = await Order.find({
                customerId: data["custId"],
                createAt: { $gte: startOfDay, $lte: endOfDay },
            });

            for (const _order of _data) {
                _order.orderStatus = "completed"
                await _order.save();
            }
        }

        return NextResponse.json({ message: "success" });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: 'internal server error' }, { status: 500 });
    }
}
