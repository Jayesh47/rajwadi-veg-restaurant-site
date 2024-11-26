import {NextResponse, NextRequest} from 'next/server';
import Employee from '@/app/apis/lib/employees';

export async function GET(req: NextRequest) {
    try {
        const _employees = await Employee.find();
        return NextResponse.json({message: _employees}, {status: 200});
    }catch (err) {
        console.log(err)
        return NextResponse.json({message: "internal error occurred"}, {status: 500});
    }
}