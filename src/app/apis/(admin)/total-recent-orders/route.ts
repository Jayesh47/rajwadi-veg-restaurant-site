import {NextResponse, NextRequest} from 'next/server';
import Orders from '../../lib/orders';
import Reserve from '../../lib/reservation';

export async function GET(req: NextRequest) {
    try {
        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
        const _date = new Date();
        const completeOrders = await Orders.countDocuments({orderStatus: "completed", createAt: {$gte: startOfMonth, $lte: endOfMonth}});
        const pendingOrders = await Orders.countDocuments({orderStatus: "pending", createAt: {$gte: startOfMonth, $lte: endOfMonth}});
        const recentReservation = await Reserve.find({confirmStatus: "pending", reservationTime: {$gte: `01/${_date.getMonth()}/${_date.getFullYear()} 12:00AM`, $lte: `31/${_date.getMonth()}/${_date.getFullYear()} 11:59PM`}}).select("reservationTime reservationType customerName").sort("reservationTime");
        return NextResponse.json({completed: completeOrders, pending: pendingOrders, reservation: recentReservation}, {status: 200});
    }catch (err) {
        console.log(err);
        return NextResponse.json({message: "internal server error"}, {status: 500});
    }
}