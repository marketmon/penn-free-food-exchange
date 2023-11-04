import { NextResponse } from "next/server";
import { authMiddleware } from "@clerk/nextjs";
import { BASE_URL } from "./lib/constants";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/signin",
    "/signin/reset-password",
    "/signup",
    /^\/[^/]+$/,
    /^\/api\/.*$/,
  ],
  afterAuth(auth, req, _evt) {
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return NextResponse.redirect(`${BASE_URL}/signin`);
    }

    // handle users who are signed in but shouldn't be on authentication routes
    if (
      auth.userId &&
      ["/signin", "/signup", "/signin/reset-password"].includes(
        req.nextUrl.pathname
      )
    ) {
      return NextResponse.redirect(BASE_URL);
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
