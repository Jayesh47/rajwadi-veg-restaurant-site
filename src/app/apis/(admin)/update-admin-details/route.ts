import {NextRequest, NextResponse} from 'next/server';
import { verifyToken, encryptPassword } from '../../userValidation';
import Users from '@/app/apis/lib/users';
import ModelConnection from '../../lib/connection';


export async function PUT(req: NextRequest) {
    try {
        ModelConnection();
        const data = await req.json();
        const auth = req.headers.get('authorization')?.split(' ')[1];
        if (auth) {
            const authItem = verifyToken(auth);
            if (authItem && typeof authItem === 'object' && authItem["role"] === "admin") {
                const _admin = await Users.findById(authItem["userId"]);
                if (_admin) {
                    if (data["username"]) _admin["username"] = data["username"];
                    if (data["useremail"]) _admin["useremail"] = data["useremail"];
                    if (data["userpass"]) _admin["password"] = await encryptPassword(data["userpass"]);
                    _admin.save();
                    return NextResponse.json({message: "success"}, {status: 200});
                }
            }else {
                return NextResponse.json({message: "unknown"}, {status: 401});
            }
        }else {
            return NextResponse.json({message: "unauthenticate"}, {status: 401});
        }
    }catch (err) {
        console.log(err);
    }
}