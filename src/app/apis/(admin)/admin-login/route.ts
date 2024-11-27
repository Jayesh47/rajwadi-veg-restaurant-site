import { NextResponse, NextRequest } from "next/server";
import Users from "@/app/apis/lib/users";
import ModelConnection from "@/app/apis/lib/connection";
import { checkPassword, tokenGenerate, userExists } from "@/app/apis/userValidation";
import Employee from '../../lib/employees';


export async function POST(req: NextRequest) {
    try {
        (await ModelConnection());
        const data = await req.json();
        if (data["role"] === "admin") {
            if ((await userExists(data["useremail"]))) {
                const _user = await Users.findOne({ email: data["useremail"] })
                if ((await checkPassword(data["password"], _user["password"]))) {
                    return NextResponse.json({ message: "success", adminToken: (await tokenGenerate({ userId: _user._id.toString(), role: _user["role"] })) }, { status: 200 });
                } else {
                    return NextResponse.json({ message: "invalid password" }, {status: 200});
                }
            } else {
                return NextResponse.json({ message: "invalid email" }, {status: 401});
            }
        }else if (data['role'] === "chef") {
            const emp = await Employee.findOne({employeeEmail: data["useremail"]});
            if (emp && emp["employeeRole"] === "chef" && emp["employeeName"] === data["username"]) {
                return NextResponse.json({message: "success", adminToken: await tokenGenerate({empId: emp._id.toString(), role: "chef"})}, {status: 200});
            }else {
                return NextResponse.json({message: "invalid credentials"}, {status: 401});
            }
        }else if (data['role'] === "Receptionist") {
            const emp = await Employee.findOne({employeeEmail: data["useremail"]});
            if (emp && emp["employeeRole"] === "Receptionist" && emp["employeeName"] === data["username"]) {
                return NextResponse.json({message: "success", adminToken: await tokenGenerate({empId: emp._id.toString(), role: "Receptionist"})}, {status: 200});
            }else {
                return NextResponse.json({message: "invalid credentials"}, {status: 401});
            }
        }else {
            return NextResponse.json({message: "unauthorized"}, {status: 401});
        }
    } catch (err) {
        console.log(err);
    }
}
