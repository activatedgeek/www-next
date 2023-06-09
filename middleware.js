import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [/^\/(db|kb|library)?/],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
