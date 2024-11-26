import { NextResponse, NextRequest } from 'next/server';
import Employee from '@/app/apis/lib/employees'; // Ensure this is the correct path to your Mongoose model

export async function PUT(req: NextRequest) {
    try {
        const { employeeId, employeeName, employeeSalary, employeeRole, employeeEmail } = await req.json();

        if (!employeeId) {
            return NextResponse.json({ message: "Employee ID is required" }, { status: 400 });
        }

        const updateData: Record<string, any> = {};
        if (employeeName) updateData.employeeName = employeeName;
        if (employeeSalary) updateData.employeeSalary = employeeSalary;
        if (employeeRole) updateData.employeeRole = employeeRole;
        if (employeeEmail) updateData.employeeEmail = employeeEmail;
        console.log(updateData);

        if (Object.keys(updateData).length === 0) {
            return NextResponse.json({ message: "No fields provided for update" }, { status: 400 });
        }

        const updatedEmployee = await Employee.findByIdAndUpdate(
            employeeId,
            updateData,
            { new: true }
        );

        if (!updatedEmployee) {
            return NextResponse.json({ message: "Employee not found" }, { status: 404 });
        }

        return NextResponse.json(
            { message: "success", },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
