import { ConnectDB } from "@/helper/bd";
import { UserData } from "@/model/user";

import { NextResponse } from "next/server";

export const GET = async (request) => {
    await ConnectDB()

   let users=[]
    try {
      users=await UserData.find().select("-password")
        return NextResponse.json(users)
    } catch (error) {
         console.log(error)
         return NextResponse.json(error)        
    }
    
}



export const POST = async (request) => {
    const { name, email, password, about, ProfileURL } = await request.json();

   
    await ConnectDB();

    try {
        // Check if user already exists
        const existingUser = await UserData.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: "User with this email already exists", status: false },
                { status: 409 } // 409 Conflict
            );
        }

        // Create new user
        const newUser = new UserData({
            name,
            email,
            password, // Note: You should hash the password before saving
            about,
            ProfileURL
        });

        // Save user to database
        const savedUser = await newUser.save();

        // Return success response (exclude password in response)
        const userResponse = {
            _id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email,
            about: savedUser.about,
            ProfileURL: savedUser.ProfileURL
        };

        return NextResponse.json(
            {
                message: "User created successfully",
                status: true,
                data: userResponse
            },
            { status: 201 } // 201 Created
        );

    } catch (error) {
        console.error("User creation error:", error);


        return NextResponse.json(
            {
                message: error,
                status: false
            }
        );
    }
};

export const DELETE = () => {


    console.log("The Data Has been Delete Please Give")
    return NextResponse.json(
        {
            message: "Deleted !",
            status: true
        }
    )



}