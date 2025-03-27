"use client"
import { useParams, usePathname } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import dynamic from "next/dynamic";
import { useChatsContext } from "@/contexts/chats";
import { useEffect } from "react";
import { pusher } from "@/lib/pusher";
import { useUserContext } from "@/contexts/user";
import { MessageTypePusherResponse, UserType } from "@/@types";

const ChatsSideNavigation = dynamic(() => import("./chats-side-navigation"))

export default function Layout({
    message,
}: Readonly<{
    message: React.ReactNode
}>) {

    const params = useParams<{id: string}>();

    console.log(params?.id);

    const { user } = useUserContext()

    const { chats, dispatch } = useChatsContext()

    const pathname = usePathname()

    const isNotMobileScreen = useMediaQuery({
        query: '(min-width: 640px)'
    })

    const chatIndex = chats.findIndex(item => item._id === params?.id);

    useEffect(() => {
    
            if (!user?._id) return;
    
            const userChannel = pusher.subscribe(`user-${user?._id}`);
            console.log(`user-${user?._id}`)
    
            userChannel.bind("listen", (payload: MessageTypePusherResponse) => {
                console.log("Listening", payload); 
    
                const chatId = payload.chatId;
                const data = payload.data;
    
                if (user?._id === (data.from as UserType)?._id) {
                    console.log("Second effect UPDATE_CHAT_MESSAGE", data)
                    dispatch({ 
                        type: "UPDATE_CHAT_MESSAGE", 
                        payload: {
                            chatId,
                            message: data,
                        }
                    })
                }
                else {
                    console.log("Second effect ADD_CHAT_MESSAGE", data)
                    dispatch({ 
                        type: "ADD_CHAT_MESSAGE", 
                        payload: {
                            chatId,
                            message: data,
                        }
                    })
                }
            });
    
            return () => {
                userChannel.unbind_all();
                userChannel.unsubscribe();
            };
        }, [user?._id, chats, chats[chatIndex]?.messages]);

    const isChatSidebarActive = pathname !== '/messages' && !isNotMobileScreen;
    const isMessageBoxActive = pathname === '/messages' && !isNotMobileScreen;

    return (
        <div className="h-screen">
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
    );
}