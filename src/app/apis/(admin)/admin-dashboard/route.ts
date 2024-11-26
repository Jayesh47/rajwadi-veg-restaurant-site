import { headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import { verifyToken } from "../../userValidation";
import Users from "../../lib/users";
import Orders from '../../lib/orders';
import Employee from '../../lib/employees';

export async function GET(req: NextRequest) {
    try {
        const data = headers();
        const validation = data.get("authorization")?.split(' ');
        if (validation && validation[0] === "Bearer") {
            const admin = verifyToken(validation[1]);
            if (typeof admin === "object" && admin["role"] === "admin") {
                const now = new Date();
                const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
                const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

                const totalUsers = await Users.countDocuments({ role: "customer" });

                const totalOrders = await Orders.countDocuments({
                    orderStatus: "pending",
                    createAt: { $gte: startOfMonth, $lte: endOfMonth }
                });
                
                const totalSalesResult = await Orders.aggregate([
                    {
                        $match: {
                            createAt: { $gte: startOfMonth, $lte: endOfMonth },
                            paymentStatus: "completed"
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            totalSales: { $sum: { $toDouble: "$TotalBill" } }
                        }
                    }
                ]);
                const totalSales = totalSalesResult.length > 0 ? totalSalesResult[0].totalSales : 0;
                const totalEmp = await Employee.countDocuments();

                return NextResponse.json({
                    totalUsers: totalUsers,
                    totalOrders: totalOrders,
                    totalSales: totalSales,
                    totalEmployee: totalEmp
                });
            }
        }
        return NextResponse.json({ message: "Unauthorized access" }, { status: 401 });
    } catch (err) {
        console.error('Error in GET API:', err);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
