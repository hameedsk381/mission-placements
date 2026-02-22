import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
    const isLoggedin = !!req.auth
    const { nextUrl } = req

    const isAuthRoute = nextUrl.pathname.startsWith("/login")
    const isProtectedRoute = nextUrl.pathname.startsWith("/portal")
    const isManagerRoute = nextUrl.pathname.startsWith("/portal/manager")

    if (isAuthRoute) {
        if (isLoggedin) {
            return NextResponse.redirect(new URL("/portal/student", nextUrl))
        }
        return NextResponse.next()
    }

    if (isProtectedRoute && !isLoggedin) {
        return NextResponse.redirect(new URL("/login", nextUrl))
    }

    if (isManagerRoute) {
        const role = (req.auth?.user as any)?.role
        if (role !== "MANAGER") {
            return NextResponse.redirect(new URL("/portal/student", nextUrl))
        }
    }

    return NextResponse.next()
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
