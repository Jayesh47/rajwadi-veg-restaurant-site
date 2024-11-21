import { NextResponse, NextRequest } from 'next/server';
import Reserve from '@/app/apis/lib/reservation';
import { verifyToken } from '../../userValidation';


export async function POST(req: NextRequest) {
    try {
        const auth = req.headers.get("Authorization");
        if (auth) {
            const _user = verifyToken(auth)
            if (_user && typeof _user === 'object' && _user["userId"].length > 0) {
                const data = await Reserve.find({customerId: _user["userId"]});
                return NextResponse.json({ message: data }, { status: 200 });
            }
        }
        else {
            const data = await Reserve.find().limit(10);
            return NextResponse.json({ message: data }, { status: 200 });
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'internal error' }, { status: 500 });
    }
}