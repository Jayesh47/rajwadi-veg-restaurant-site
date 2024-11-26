import {NextResponse, NextRequest} from 'next/server';
import Employee from '../../lib/employees';

export async function DELETE(req: NextRequest) {
    try {
        const empId = req.headers.get("Authorization");
        if (empId) {
            console.log(empId);
            const res = await Employee.findByIdAndDelete(empId);
            return NextResponse.json({message: "success"}, {status: 200});
        }
    }catch (err) {
        console.log(err);
    }
}