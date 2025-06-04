import { NextResponse } from "next/server";


export function middleware(request) {
    console.log("middleware executed");
    const authToken = request.cookies.get("logintoken")?.value;
    if (request.nextUrl.pathname === "/api/Login") {
        return;
    }
    const loggedInUserNotAccessPaths = request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/signup";
    
    console.log("This is a mytoken",loggedInUserNotAccessPaths, authToken)



    if (loggedInUserNotAccessPaths) {
        if (authToken) {
            return NextResponse.redirect(new URL('/showTask', request.url))
        }
    }
    else {
        if(!authToken){
            return NextResponse.redirect(new  URL("/login",request.url))
        }
    }
    console.log(authToken);

    console.log(loggedInUserNotAccessPaths, "loggedInUserNotAccessPaths");

    console.log("middleware executed for path:", request.nextUrl.pathname);
    return NextResponse.next();

}


export const config = {
    matcher: [
        '/',
        '/add-task',
        '/showTask',
        '/login',
        '/signup',

    ],
}