"use client"

import { ChatsProvider } from "@/contexts/chats";
import { UserProvider } from "@/contexts/user"
import { usePathname } from "next/navigation";

export default function ProviderWrapper({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const pathname = usePathname();

    const publicRoutes = ['/login', '/', '/register', '/friends'];

    const isPublicRoute = publicRoutes.some((item) => pathname === item);

    return (
        <>
            {
                !isPublicRoute ? (
                    <UserProvider>
                        <ChatsProvider>
                            {children}
                        </ChatsProvider>
                    </UserProvider >
                ) : (
                    children
                )
            }
        </>

    )
}