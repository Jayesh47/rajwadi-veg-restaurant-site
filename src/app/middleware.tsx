import { NextResponse, NextRequest } from 'next/server';
import { JwtPayload } from 'jsonwebtoken';

export async function middleware(req: NextRequest) {
    console.log("middleware executed!");
    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/*'],
};
