import { ConnectDB } from "@/helper/bd"
import { UserData } from "@/model/user"
import { NextResponse } from "next/server"

export const DELETE = async (request, { params }) => {


    const { userId } = params
    try {

        await UserData.deleteOne({
            _id: userId
        })

        return NextResponse.json({
            message: "User has been Deleted"
        })


    } catch (error) {
        console.log(error)
        return NextResponse.json(error, {
            message: "Fail to delete Data user"
        })
    }

}



export const GET = async (request, { params }) => {
    const { userid } = params;
    try {
        const user = await UserData.findOne(userid).select("-password")
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json({
            message: "User has not exited"
        })
    }
}



export const PUT = async (request, { params }) => {
    const { userId } = params;
    const { name, password, about, ProfileURL } = await request.json();

    await ConnectDB();

    try {

        const user = await UserData.findById(userId);


        if (!user) {
            return NextResponse.json({message:"User not found"})
        }

        user.name = name;
        user.about = about;
        user.ProfileURL = ProfileURL;
        user.password = password


        // Save updated user
        const updatedUser = await user.save();

        const userResponse = {
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            about: updatedUser.about,
            ProfileURL: updatedUser.ProfileURL
        };

        return NextResponse.json(
            {
                message: "User updated successfully",
                status: true,
                data: userResponse
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Update error:", error);
        return NextResponse.json(
            {
                message: "Failed to update user",
                error: error.message,
                status: false
            },
            { status: 500 }
        );
    }
};