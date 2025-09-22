import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export default async function middleware(req) {
  const {isAuthenticated}=getKindeServerSession();
    if(!(await isAuthenticated()))
    {
        return NextResponse.redirect(new URL('/api/auth/login?post_login_redirect_url=/dashboard', req.url))
    }
}

export const config = {
  matcher: [
    "/dashboard/:path*", // Protect dashboard + nested routes
    "create-business",
    "/dashboard",
  ],
};
