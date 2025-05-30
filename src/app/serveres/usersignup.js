import { HttpasAxios } from "@/helper/HttpsHelper"







export const Signup=async(formData)=>{
try {
    const signuprsult=await HttpasAxios.post("/api/user",formData).then((respose)=>{respose.data})
    return signuprsult
} catch (error) {
    console.log(error)
}
}