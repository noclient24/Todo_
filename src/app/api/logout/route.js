import { NextResponse } from "next/server"

export const POST = (request) => {
  const response = NextResponse.json({
    message: "Logged out successfully",
    success: true
  })

  // Clear the cookie
  response.cookies.set("logintoken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(0)
  })

  return response
}