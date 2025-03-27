import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    console.log("Middleware running...")

    try {
        const token = request.cookies.get('token');

        if (!token) return redirectToLogin(request);

        const apiResponse = await fetch(new URL(`${process.env.NEXT_PUBLIC_API_BASE}/api/users/me`), {
            method: "GET",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `token=${token?.value}`
            }
        });

        const data = await apiResponse.json()

        if (data.success) return NextResponse.next();

        return redirectToLogin(request);
    }
    catch (error) {
        console.log(error)
        return redirectToLogin(request);
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|api|register|login|friends|$|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}

function redirectToLogin(request: NextRequest) {
    const url = request.nextUrl.clone();
    if (!url.pathname.startsWith("/login") && !url.pathname.startsWith("/create-account")) {
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }
    return NextResponse.next();
}