import { NextRequest, NextResponse } from 'next/server';
import Order from '@/app/apis/lib/orders';

export async function GET(req: NextRequest) {
    try {
        const startOfDay = new Date();
        startOfDay.setUTCHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setUTCHours(23, 59, 59, 999);

        const orders = await Order.find({
            createAt: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
        });

        const groupedOrders = orders.reduce((acc, order) => {
            const { createAt, _id, customerId, productName, TotalBill, orderStatus } = order;

            const uniqueOrderKey = `${customerId}-${createAt.toISOString()}`;

            if (!acc[uniqueOrderKey]) {
                acc[uniqueOrderKey] = {
                    orderId: _id,
                    customerId: customerId,
                    customerOrder: [],
                    totalPays: 0,
                    date: createAt,
                    status: orderStatus,
                };
            }

            acc[uniqueOrderKey].customerOrder.push(productName);
            acc[uniqueOrderKey].totalPays += parseFloat(TotalBill);

            return acc;
        }, {});

        const response: any = Object.values(groupedOrders);
        response.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

        return NextResponse.json({ message: response }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "internal error" }, { status: 500 });
    }
}
