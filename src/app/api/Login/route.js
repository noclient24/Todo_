import { UserData } from "@/model/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"

import  jwt  from "jsonwebtoken";

export const POST = async (request) => {
    const { email, password } = await request.json();

    try {

        const user= await UserData.findOne({
            email: email
        })

        if (user === null) {
            return NextResponse({
                message: "User not Found"
            })
        }


        const passwormatch=await bcrypt.compareSync(password,user.password)
        if (!passwormatch){
            throw new Error ("password not match")
        }

        const mytoken=jwt.sign({
            _id:user._id,
            name:user.name
        },process.env.JWT_KEY)



        return NextResponse.json(mytoken,{
            message:"success"
        })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: error,
            status: 500
        })
    }
}