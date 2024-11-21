import { headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import { verifyToken } from "../../userValidation";
import { Users } from "../../lib/users";


export async function GET(req: NextRequest) {
    try {
        const data = headers();
        const validation = data.get("authorization")?.split(' ');
        if (validation && validation[0] === "Bearer") {
            const admin = verifyToken(validation[1]);
            if (typeof admin === "object" && admin["role"] === "admin") {
                const totalUsers = await Users.countDocuments({role: "customer"});
                console.log(totalUsers);
                return NextResponse.json({
                    totalUsers: totalUsers
                });
            }
        }
    }catch(err) {
        console.log(err);
    }
}