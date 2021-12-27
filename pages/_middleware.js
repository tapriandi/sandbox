import { NextResponse } from "next/server";

export function middleware(req) {
  const cookies = req.cookies;
  const url = req.nextUrl;

  if (url.href === "/login") {
    if (cookies._username) {
      return NextResponse.redirect("/");
    }
  } 
  else if (url.href === "/register") {
    if (cookies._username) {
      return NextResponse.redirect("/");
    }
  }
  else if (url.href === "/post") {
    if (!cookies._username) {
      return NextResponse.redirect("/login");
    }
  }
  else {
    if (!cookies._username) {
      return NextResponse.redirect("/login");
    }
  }
  return NextResponse.next();
}
