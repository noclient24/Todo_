import { UserData } from "@/model/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"

import jwt from "jsonwebtoken";
import { ConnectDB } from "@/helper/bd";

export const POST = async (request) => {
    const { email, password } = await request.json();
    try {
        await ConnectDB()
        const user = await UserData.findOne({
            email: email
        })
        if (user === null) {
            return NextResponse({
                message: "User not Found"
            })
        }

      const passwormatch = await bcrypt.compareSync(password, user.password)
        if (!passwormatch) {
            throw new Error("password not match")
        }

        const mytoken = jwt.sign({
            _id: user._id,
            name: user.name
        }, process.env.JWT_KEY)






        const response = NextResponse.json(mytoken, {
            message: "success"
        })



        response.cookies.set("logintoken", mytoken, {
            expireIn: "1d",
            httpOnly: false
        })

        return response

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: error,
            status: 500
        })
    }
}