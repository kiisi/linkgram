"use client"
import NavigationBar from "@/components/core/navigation-bar";
import { ChatsProvider } from "@/contexts/chats";
import ChatsSideNavigation from "./chats-side-navigation";


export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <ChatsProvider>
            <div className="h-screen">
                <NavigationBar />
                <div className="h-[calc(100vh_-_56px)] w-full flex">
                    <ChatsSideNavigation />
                    <main className="bg-[#f2f4f7] p-[12px] flex-1">
                        {children}
                    </main>
                </div>
            </div>
        </ChatsProvider>
    );
}