import { UserData } from "@/app/model/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ConnectDB } from "@/app/helper/bd";

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
      { 
        message: "Login successful", 
        user: { 
          name: user.name, 
          email: user.email 
        } 
      },
      { status: 200 }
    );

    response.cookies.set("logintoken", token, {
      maxAge: 24 * 60 * 60, // 1 day
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return response;

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};