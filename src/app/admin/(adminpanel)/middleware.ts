// import { NextResponse, NextRequest } from 'next/server';
// import { verifyToken } from '@/userValidation';
// import { JwtPayload } from 'jsonwebtoken';

// export async function middleware(req: NextRequest) {
//     console.log("middleware executed");
//     // const token = req.cookies.get('adminToken')?.value;
//     // console.log(token);

//     // if (!token) {
//     //     console.log('No token found, redirecting to login...');
//     //     return NextResponse.redirect(new URL('/admin-login', req.url));
//     // }

//     // try {
//     //     const admin = verifyToken(token) as JwtPayload;
        
//     //    if (!admin && admin["role"] === "admin") {
//     //         return NextResponse.redirect("/");
//     //    }
//     //    return NextResponse.redirect('/admin');
//     // } catch (err) {
//     //     console.error('Token verification failed:', err);
//     //     return NextResponse.redirect(new URL('/admin-login', req.url));
//     // }
//     return NextResponse.next();
// }

// // export const config = {
// //     matcher: ['/admin/*'],
// // };
