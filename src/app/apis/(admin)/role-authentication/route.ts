import { NextResponse, NextRequest } from 'next/server';
import { verifyToken } from '../../userValidation';
import { JwtPayload } from 'jsonwebtoken';

export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get("Authorization");
        const token = authHeader?.split(" ")[1];
        if (token) { 
            const user = verifyToken(token) as JwtPayload;
            if (user["userId"]) {
                return NextResponse.json({ message: "admin" }, { status: 200 });
            } else if (user["role"] === 'chef') {
                return NextResponse.json({ message: "chef" }, { status: 200 });
            } else if (user["role"] === "Receptionist") {
                return NextResponse.json({ message: "chef" }, { status: 200 });
            }
        }
        return NextResponse.json({ message: "unauthorized" }, { status: 401 });

    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "internal server error" }, { status: 500 });
    }
}