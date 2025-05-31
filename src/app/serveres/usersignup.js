import { HttpasAxios } from "@/helper/HttpsHelper"
export const Signup = async (formData) => {
    try {
        const signuprsult = await HttpasAxios.post("/api/user", formData).then((respose) => { respose.data })
        return signuprsult
    } catch (error) {
        console.log(error)
    }
}
export const Login = async (loginData) => {
    try {
        const userlogin = await HttpasAxios.post("/api/Login", loginData);
        return userlogin;
    } catch (error) {
        console.log(error);
        throw error.response?.data?.message || error.message || "Login failed";
    }
}