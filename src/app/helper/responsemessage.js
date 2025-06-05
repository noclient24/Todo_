import { NextResponse } from "next/server"


export const getResponsiveMessage=(message,successStatus,StatusCode)=>{
    return NextResponse.json({
        message:message,
        success:successStatus
    },{
        Status:StatusCode
    })
}