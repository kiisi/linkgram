"use client"
import { MessageType, UserType } from "@/@types"
import { useChatsContext } from "@/contexts/chats"
import { useUserContext } from "@/contexts/user"
import { Phone, Video } from "lucide-react"
import { useEffect } from "react"
import Pusher from 'pusher-js';
import ChatBox from "./chatbox"
import { useRouter } from "next/navigation"

const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER!,
});


export default function Message({ id }: { id: string }) {

    const router = useRouter();

    const { user } = useUserContext()

    const { chats, dispatch } = useChatsContext()

    const chat = chats.find(data => data._id === id);

    const chatMessages = chat?.messages ?? [];

    const participant = (chat?.participants.find(data => typeof data !== "string" && data._id !== user?._id)) || chat?.participants[0];

    async function sendMessage(data: MessageType) {
        const payload: MessageType = {
            ...data,
            chatId: chat?._id,
        }

        await deliverMessage(payload);
    }

    useEffect(() => {

        const channel = pusher.subscribe("chat-room");

        channel.bind("new-message-event", (data: MessageType) => {

            console.log("Success Data ===>", data)
            
            if (user?._id === (data.from as UserType)?._id) {
                dispatch({ 
                    type: "UPDATE_CHAT", 
                    payload: {
                        chatId: id,
                        message: data,
                    }
                })
            }
            else {
                dispatch({ 
                    type: "ADD_CHAT", 
                    payload: {
                        chatId: id,
                        message: data,
                    }
                })
            }
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [chatMessages.length]);

    const backNavigationHandler = () => {
        router.push('/messages');
    };

    return (
        <div className="h-full w-full bg-white rounded-[8px] flex flex-col chat-box-layout">
            <div className="shadow-sm px-[8px]">
                <header className="h-[56px] flex items-center justify-between">
                    <div className="flex items-center gap-[5px]">
                        <button onClick={backNavigationHandler} className="sm:hidden grid place-items-center cursor-pointer h-[36px] w-[36px] rounded-full hover:bg-[#F2F2F2]">
                            <svg viewBox="0 0 12 13" width="20" height="20" fill="currentColor" aria-hidden="true" className="" style={{ color: 'var(--color-primary)' }}><g fillRule="evenodd" transform="translate(-450 -1073)"><g fillRule="nonzero"><path d="M100.655 923.405a.75.75 0 0 0-1.06-1.06l-3.125 3.125a.75.75 0 0 0 0 1.06l3.125 3.125a.75.75 0 0 0 1.06-1.06L98.061 926l2.594-2.595z" transform="translate(355 153.5)"></path><path d="M105 925.25h-7.688a.75.75 0 1 0 0 1.5H105a.75.75 0 1 0 0-1.5z" transform="translate(355 153.5)"></path></g></g></svg>
                        </button>
                        <div className="flex gap-[8px] items-center cursor-pointer hover:bg-[#F2F2F2] p-[5px] rounded-[8px]">
                            <div className="text-center text-[14.5px] tracking-[1px] leading-[40px] h-[40px] w-[40px] rounded-full bg-primary-alt text-white shrink-0">
                                DF
                            </div>
                            <p className="font-medium text-[14.5px] mt-[1px] text-[#121414] overflow-hidden truncate">
                                {(participant as UserType)?.firstName + " " + (participant as UserType)?.lastName}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-[2.5px]">
                        <button className="grid place-items-center cursor-pointer h-[36px] w-[36px] rounded-full hover:bg-[#F2F2F2]">
                            <Phone className="h-5 w-5 text-primary fill-primary" />
                        </button>
                        <button className="grid place-items-center cursor-pointer h-[36px] w-[36px] rounded-full hover:bg-[#F2F2F2]">
                            <Video className="h-5 w-5 text-primary fill-primary" />
                        </button>
                        <button className="grid place-items-center cursor-pointer h-[36px] w-[36px] rounded-full hover:bg-[#F2F2F2]">
                            <svg height="24px" name="icon" role="presentation" viewBox="0 0 36 36" width="24px"><g transform="translate(18,18)scale(1.2)translate(-18,-18)"><path d="M18,10 C16.6195,10 15.5,11.119 15.5,12.5 C15.5,13.881 16.6195,15 18,15 C19.381,15 20.5,13.881 20.5,12.5 C20.5,11.119 19.381,10 18,10 Z M16,25 C16,25.552 16.448,26 17,26 L19,26 C19.552,26 20,25.552 20,25 L20,18 C20,17.448 19.552,17 19,17 L17,17 C16.448,17 16,17.448 16,18 L16,25 Z M18,30 C11.3725,30 6,24.6275 6,18 C6,11.3725 11.3725,6 18,6 C24.6275,6 30,11.3725 30,18 C30,24.6275 24.6275,30 18,30 Z" fill="var(--color-primary)" stroke="var(--color-primary)"></path></g></svg>
                        </button>
                    </div>
                </header>
            </div>
            <ChatBox
                chatId={id}
                sendMessage={sendMessage}
                chatMessages={chatMessages}
                userId={user?._id ?? ''}
                recipientId={(participant as UserType)?._id}
            />
        </div>
    )
}

async function deliverMessage(message: MessageType) {
    console.log("SEND MESSAGE", message)

    const response = await fetch("/api/messages/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            data: message,
        }),
    });

    return await response.json();
}