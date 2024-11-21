import {NextResponse, NextRequest} from 'next/server';
import Home from '@/app/apis/lib/homepage';
import ModelConnection from '../../lib/connection';

export async function GET(req: NextRequest) {
    await ModelConnection();
    try {
        const data = await Home.find();
        const res = data.map((_val) => {
            return {
                banner: _val["banners"],
                description: _val["description"]
            }
        });
        return NextResponse.json(res, {status: 200});
    }catch (err) {
        console.log(err);
        return NextResponse.json({message: "Internal Error"}, {status: 500});
    }
}