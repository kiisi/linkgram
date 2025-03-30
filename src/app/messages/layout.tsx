"use client"
import { usePathname } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import dynamic from "next/dynamic";

const ChatsSideNavigation = dynamic(() => import("./chats-side-navigation"))

export default function Template({
    message,
}: Readonly<{
    message: React.ReactNode,
}>) {

    const pathname = usePathname()

    const isNotMobileScreen = useMediaQuery({
        query: '(min-width: 640px)'
    })

    const isChatSidebarActive = pathname !== '/messages' && !isNotMobileScreen;
    const isMessageBoxActive = pathname === '/messages' && !isNotMobileScreen;

    return (
        <div className="h-screen">
            <div className="h-screen w-full flex">
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
    );
}