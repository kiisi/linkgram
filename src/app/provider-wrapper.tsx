"use client"

import { ChatsProvider } from "@/contexts/chats";
import { UserProvider } from "@/contexts/user"

export default function ProviderWrapper({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <UserProvider>
            <ChatsProvider>
                {children}
            </ChatsProvider>
        </UserProvider >
    )
}