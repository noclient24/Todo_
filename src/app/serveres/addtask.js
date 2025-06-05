import { HttpasAxios } from "@/app/helper/HttpsHelper"


export const AddTask=async(task)=>{
    try {

        
     const Result= await  HttpasAxios.post("/api/Tasks",task).then((res)=>{res.data})
     return Result
    } catch (error) {
        console.log(error)
    }
}