import { NextRequest, NextFetchEvent } from 'next/server';
import middleware from 'lib/middleware';

// eslint-disable-next-line
export default async function (req: NextRequest, ev: NextFetchEvent) {
  
  //handle if the login is required or not
  
  // const authToken = req.cookies.get("authCookie");
  // console.log("Auth token" + authToken);
  // console.log("Pathname", req.nextUrl.pathname);
  // if (!authToken && (req.nextUrl.pathname === "/" || req.nextUrl.pathname === "/job-list" || req.nextUrl.pathname.startsWith("/job"))) {    
  //   return NextResponse.redirect(new URL('/login', req.url))
  // }

  return middleware(req, ev);
}

export const config = {
  // Exclude Sitecore editing API routes
  matcher: ['/', '/((?!api/editing/).*)'],
};
