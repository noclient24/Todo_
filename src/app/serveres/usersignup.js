import { HttpasAxios } from "@/app/helper/HttpsHelper"

export const Signup = async (formData) => {
  try {
    const response = await HttpasAxios.post("/api/user", formData);
    return response.data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error.response?.data?.message || error.message || "Signup failed";
  }
}

export const Login = async (loginData) => {
  try {
    const response = await HttpasAxios.post("/api/Login", loginData);
    return response;
  } catch (error) {
    console.error("Login error:", error);
    throw error.response?.data?.message || error.message || "Login failed";
  }
}

export const Current = async () => {
  try {
    const response = await HttpasAxios.get("/api/current");
    return response.data;
  } catch (error) {
    console.error("Current user error:", error);
    throw error.response?.data?.message || error.message || "Failed to fetch current user";
  }
}