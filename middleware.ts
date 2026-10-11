import { NextResponse } from "next/server";

export const config = {
  matcher: ["/Profile/:path*"],
};

export default async function middleware(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  
  // Check if the user has a valid session cookie
  // better-auth stores session in a cookie
  if (!cookie.includes("better-auth")) {
    const url = new URL("/sign-in", req.url);
    url.searchParams.set("callback", req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}