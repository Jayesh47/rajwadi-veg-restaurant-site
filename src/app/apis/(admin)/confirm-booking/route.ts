import { NextResponse, NextRequest } from 'next/server';
import Reserve from '@/app/apis/lib/reservation';

export async function PUT(req: NextRequest) {
    try {
        const data = (await req.json());
        if (data["isConfirm"] === "confirm") {
            const res = await Reserve.findByIdAndUpdate(data["userid"], {
                confirmStatus: "confirm"
            });
            res.save();
        }
        else if (data["isConfirm"] === "Reject") {
            const res = await Reserve.findByIdAndUpdate(data["userid"], {
                confirmStatus: "reject"
            });
            res.save();
        }
        return NextResponse.json({ message: "success" }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "internal error" }, { status: 500 });
    }
}