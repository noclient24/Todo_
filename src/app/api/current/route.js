import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { UserData } from "@/app/model/user";

export const GET = async (request) => {
   try {
     // Get token from cookies
     const authToken = request.cookies.get("logintoken")?.value;
     
    
     if (!authToken) {
       return NextResponse.json(
         { message: "Authentication token missing",
          error:authToken
          },
         { status: 401 }
       );
     }

     // Verify token
     const decoded = jwt.verify(authToken, process.env.JWT_KEY);
     
     // Find user
     const user = await UserData.findById(decoded._id).select("-password");
     
     if (!user) {
       return NextResponse.json(
         { message: "User not found" },
         { status: 404 }
       );
     }

     return NextResponse.json(user);
     
   } catch (error) {
     console.error("API Error:", error);
     
     if (error.name === "JsonWebTokenError") {
       return NextResponse.json(
         { message: "Invalid or expired token" },
         { status: 401 }
       );
     }
     
     return NextResponse.json(
       { message: "Internal server error" },
       { status: 500 }
     );
   }
}