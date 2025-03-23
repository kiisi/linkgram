"use client"
import NavigationBar from "@/components/core/navigation-bar";
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
    console.log(isMessageBoxActive)

    return (
        <ChatsProvider>
            <div className="h-screen">
                <NavigationBar />
                <div className="h-[calc(100vh_-_56px)] w-full flex">
                    {isChatSidebarActive ? null : <ChatsSideNavigation />}
                    {
                        isMessageBoxActive ? null : (
                            <main className="bg-[#f2f4f7] px-[12px] py-[12px] flex-1">
                                {message}
                            </main>
                        )
                    }
                </div>
            </div>
        </ChatsProvider>
    );
}