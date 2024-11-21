import { NextResponse, NextRequest } from "next/server";
import { Users } from "@/app/apis/lib/users";
import ModelConnection from "@/app/apis/lib/connection";
import { checkPassword, tokenGenerate, userExists } from "../../userValidation";


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
        }else {
            return NextResponse.json({message: "not authorized"}, {status: 403});
        }
    } catch (err) {
        console.log(err);
    }
}
