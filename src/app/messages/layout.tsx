"use client"
import { ChatsProvider } from "@/contexts/chats";
import ChatsSideNavigation from "./chats-side-navigation";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "react-responsive";

export default function Layout({
    message,
}: Readonly<{
    message: React.ReactNode
}>) {
    const pathname = usePathname()

    const isNotMobileScreen = useMediaQuery({
        query: '(min-width: 640px)'
    })

    const isChatSidebarActive = pathname !== '/messages' && !isNotMobileScreen;
    const isMessageBoxActive = pathname === '/messages' && !isNotMobileScreen;

    return (
        <ChatsProvider>
            <div className="h-screen">
                {/* <NavigationBar /> */}
                <div className="-not-needed-h-[calc(100vh_-_56px)] h-screen w-full flex">
                    {isChatSidebarActive ? null : <ChatsSideNavigation />}
                    {
                        isMessageBoxActive ? null : (
                            <main className="flex-1">
                                {message}
                            </main>
                        )
                    }
                </div>
            </div>
        </ChatsProvider>
    );
}