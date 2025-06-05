import { ConnectDB } from "@/app/helper/bd"
import { getResponsiveMessage } from "@/app/helper/responsemessage"
import { Task } from "@/app/model/task"
import { NextResponse } from "next/server"


export const GET=async(request,{params})=>{
    const {taskid}=params
    await ConnectDB()
    try {
        const getData=await Task.findById(taskid)
        return NextResponse.json(getData)
        
    } catch (error) {
        return getResponsiveMessage("Fail to get Data",404,false)
    }
}


export const PUT=async(request,{params})=>{

    const {taskid}=params
    await ConnectDB()

    const {tittle,content,status}=await request.json()

    try {

        const updated=await Task.findById(taskid)

        updated.tittle=tittle
        updated.content=content
        updated.status=status


        const updatetask=await updated.save()
        return NextResponse.json(updatetask)

        
    } catch (error) {
        return getResponsiveMessage(error,500,false)
    }


}


export const DELETE = async (request, { params }) => {


    const { taskid } = params
    try {

        await Task.deleteOne({
            _id: taskid
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
