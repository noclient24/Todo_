import { getResponsiveMessage } from "@/app/helper/responsemessage"
import { Task } from "@/app/model/task"
import { NextResponse } from "next/server"

export const GET=async(request,{params})=>{
  
  try {
       const {userId}=await params
      const tasks=await Task.find({
        userId:userId
      })       
      return NextResponse.json(tasks)
     } catch (error) {
 return getResponsiveMessage(error,404,500)        
     }
}