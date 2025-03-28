import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    console.log("Middleware running...")
    console.log(request.nextUrl)

    try {
        const token = request.cookies.get('token');

        if (!token) {
            const url = request.nextUrl.clone();
            url.pathname = "/login";
            return NextResponse.redirect(new URL(url));
        }

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

        const url = request.nextUrl.clone();
        url.pathname = "/login";
        return NextResponse.redirect(new URL(url));
    }
    catch (error) {
        console.log(error)
        const url = request.nextUrl.clone();
        url.pathname = "/login";
        return NextResponse.redirect(url);
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