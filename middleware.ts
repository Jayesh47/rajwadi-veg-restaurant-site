import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/app/apis/userValidation'; 

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if (pathname.startsWith("/admin/admin-dashboard")) {
        const authHeader = req.headers.get("Authorization");
        const token = authHeader?.split(" ")[1];

        if (!token) {
            return NextResponse.json({ message: "unauthorized" }, { status: 401 });
        }

        const user = verifyToken(token);
        if (!user) {
            return NextResponse.json({ message: "unauthorized" }, { status: 403 });
        }
 
        const { userId, role } = user as { userId: string; role: string };

        if (userId && role === "admin") {
            return NextResponse.next();
        }

        if (role === "chef" || role === "Receptionist") {
            return NextResponse.json({ message: "Access restricted for role: " + role }, { status: 403 });
        }
    }

    // return NextResponse.next();
}
export const config = {
    matcher: ["/api/:path*", "/admin/:path*"],
};