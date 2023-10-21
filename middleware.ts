import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: [/^\/(?!([0-9a-f]+)\/(create|manage|edit))[^/]*$/],
  ignoredRoutes: [/^\/api\/.*$/],
  afterAuth(auth, req, _evt) {
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return NextResponse.redirect(
        "https://friendly-eureka-x6jxvj44qgcvwwx-3000.app.github.dev/signin"
      );
    }

    // handle users who are authenticated but shouldn't be on a public route ("/" is fine)
    if (
      auth.userId &&
      ["/signin", "/signup", "/signin/reset-password"].includes(
        req.nextUrl.pathname
      )
    ) {
      return NextResponse.redirect(
        "https://friendly-eureka-x6jxvj44qgcvwwx-3000.app.github.dev/"
      );
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
