import {NextRequest, NextResponse} from 'next/server';
import Employee from '@/app/apis/lib/employees';

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        const _emp = new Employee({
            employeeName: data["_empName"],
            employeeEmail: data["_empEmail"],
            employeeSalary: data["_empSalary"],
            employeeRole: data["_empRole"]
        });
        _emp.save();
        if (_emp) {
            return NextResponse.json({message: "success"}, {status: 200});
        }
    }catch (err) {
        return NextResponse.json({message: "Internal Error Occurred"}, {status: 500});
    }
}