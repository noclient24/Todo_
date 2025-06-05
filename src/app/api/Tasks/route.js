import { ConnectDB } from "@/app/helper/bd";
import { getResponsiveMessage } from "@/app/helper/responsemessage";
import { Task } from "@/app/model/task";
import { NextResponse } from "next/server";




export const GET = async (request) => {

  await ConnectDB()
  try {
    const GetData = await Task.find()
    console.log(GetData)
    return NextResponse.json(GetData)
  } catch (error) {
    console.log(error)
    return getResponsiveMessage("Fail to data get", 404, false)
  }
}


export const POST = async (request) => {
  await ConnectDB();
  const { tittle, content, userId } = await request.json();

  try {
    const task = new Task({
      tittle,
      content,
      userId,
    });

    const createdTask = await task.save();
    return NextResponse.json(createdTask, {
      message: "Task has succfully created",
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Some problem create task",
    });
  }
};
