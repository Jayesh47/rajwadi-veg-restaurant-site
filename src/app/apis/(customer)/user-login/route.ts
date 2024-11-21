import { NextRequest, NextResponse } from "next/server";
import { checkPassword, tokenGenerate, userExists } from "../../userValidation";
import { Users } from "@/app/apis/lib/users";
import ModelConnection from "@/app/apis/lib/connection";

export async function POST(req :NextRequest) {
    (await ModelConnection());
    try {
        const data = await req.json();
        if ((await userExists(data["useremail"]))) {
            const userId = await Users.findOne({email: data["useremail"]});
            if ((await checkPassword(data["password"], userId["password"]))) {
                return NextResponse.json({message: "Success", userToken: (await tokenGenerate({userId: userId["_id"]}))});
            }else {
                return NextResponse.json({message: "incorrect password"});
            }
        }else {
            return NextResponse.json({message: "user not exists"});
        }
    }catch (err) {
        console.log(err);
        return NextResponse.json({message: 'internal server error'}, {status: 500});
    }
}