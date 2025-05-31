import { UserData } from "@/model/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"

import  jwt  from "jsonwebtoken";
import { ConnectDB } from "@/helper/bd";

export const POST = async (request) => {
    const { email, password } = await request.json();

    try {
        await ConnectDB();
        const user = await UserData.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        const token = jwt.sign(
            { _id: user._id, name: user.name },
            process.env.JWT_KEY,
            { expiresIn: "1d" }
        );

        const response = NextResponse.json(
            { message: "Login successful", token },
            { status: 200 }
        );

        response.cookies.set("logintoken", token, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
            httpOnly: true // Should typically be true for security
        });

        return response;

    } catch (error) {
        return NextResponse.json(
            { message: error.message || "Server error" },
            { status: 500 }
        );
    }
}