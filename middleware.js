import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [/^\/((db|kb|search)(\/.*)?)?$/],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
