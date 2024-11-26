import { NextRequest, NextResponse } from "next/server";
import ModelConnection from "@/app/apis/lib/connection";
import Users from "@/app/apis/lib/users";
import { encryptPassword, tokenGenerate, userExists } from "../../userValidation";

export async function POST(req: NextRequest) {
    try {
        await ModelConnection();
        const data = (await req.json());
        if (!(await userExists(data["useremail"]))) {
            if (data["username"] !== "" && data["user-password"] !== "") {
                const encPassword = await encryptPassword(data["user-password"]);
                const _user = new Users({
                    username: data["username"],
                    email: data["useremail"],
                    password: encPassword
                });
                const isNew = await _user.save();
                if (isNew) {
                    return NextResponse.json({ "message": "Success", userToken: (await tokenGenerate({userId: _user._id})) }, { status: 200 });
                }
            } else {
                return NextResponse.json({ message: 'incomplete form' }, { status: 200 });
            }
        }else {
            return NextResponse.json({ message: 'user already exists' }, {status: 200});
        }
    } catch (err) {
        return NextResponse.json({ message: "Internal Error" }, { status: 500 });
    }
}