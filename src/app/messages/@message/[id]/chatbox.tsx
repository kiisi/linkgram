import { MessageType, UserType } from "@/@types";
import { SendIcon } from "@/components/common/svgs"
import { useChatsContext } from "@/contexts/chats";
import { CheckCheckIcon, CheckIcon, Clock8Icon, LinkIcon } from "lucide-react"
import { Types } from "mongoose";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function ChatBox({
    userId,
    chatId,
    recipientId,
    chatMessages,
    sendMessage,
}: {
    chatId: string;
    userId: string;
    recipientId: string;
    chatMessages: MessageType[];
    sendMessage: (data: MessageType) => void
}) {

    const { dispatch } = useChatsContext();

    const [toBeSendedMessages, setToBeSendedMessages] = useState<MessageType[]>([]);

    const formRef = useRef<HTMLFormElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    async function formAction(formData: FormData) {
        const message = formData.get("message")

        const payload = {
            _id: new Types.ObjectId().toString(),
            text: message as string,
            status: "sending" as const,
            from: userId,
            to: recipientId,
            messageType: "text" as const,
        }

        dispatch({
            type: "ADD_CHAT",
            payload: {
                chatId: chatId,
                message: payload,
            }
        })
        setToBeSendedMessages(prev => [...prev, payload]);
        formRef.current?.reset();
    }

    const sendMsgs = async () => {
        while (toBeSendedMessages.length) {
            const msg = toBeSendedMessages.shift()
            setToBeSendedMessages(toBeSendedMessages)
            if (msg) {
                await sendMessage(msg);
            }
        }
    }

    useEffect(() => {
        sendMsgs()
    }, [toBeSendedMessages])

    useLayoutEffect(() => {
        scrollToBottom()
    }, [chatMessages.length])

    useEffect(() => {
        scrollToBottom(); // Run on component mount
    }, [chatId]);

    useEffect(() => {
        const timer = setTimeout(() => {
            scrollToBottom();
        }, 100);
        
        return () => clearTimeout(timer);
    }, []);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            const container = chatContainerRef.current;
            container.scrollTop = container.scrollHeight;
        }
    }

    return (
        <>
            <div ref={chatContainerRef} className="scroll-smooth chat-box-scroll-container overflow-y-auto flex-1 h-full w-full bg-[url(/images/chat-bg.png)] bg-no-repeat bg-cover">
                {
                    chatMessages.map((data, index) => (
                        (userId === data.from) || (userId === (data.from as UserType)?._id) ? (
                            <div key={index} className="flex justify-end px-4 my-2">
                                <div className="shadow-[0px_1px_2px_#72727240] max-w-[90%] bg-[#EEFFDE] text-[14.5px] py-[6px] px-[10px] relative rounded-l-[14px] rounded-tr-[16px] font-light">
                                    {data?.text}
                                    <span className="float-right relative flex items-center translate-y-[6px] pl-[10px] h-[21px] gap-[3px]">
                                        <span className="inline-block text-[11.5px] text-[#45af54]">12:24</span>
                                        <span className="inline-block">
                                            {data.status === "seen" && <CheckCheckIcon className="text-[#45af54] size-[14px]" />}
                                            {data.status === "sent" && <CheckIcon className="text-[#45af54] size-[14px]" />}
                                            {data.status === "sending" && <Clock8Icon className="text-[#45af54] size-[14px]" />}
                                        </span>
                                    </span>
                                    <BubbleRightAppendix />
                                </div>
                            </div>
                        ) : (
                            <div key={index} className="flex justify-start px-4 my-2">
                                <div className="shadow-[0px_1px_2px_#72727240] max-w-[90%] bg-[#ffffff] text-[14.5px] pt-[6px] pb-[6px] px-[10px] text-[#101010] relative rounded-r-[14px] rounded-tl-[16px] font-light">
                                    {data?.text}
                                    <span className="float-right text-[11.5px] text-[#9C9EA2] pl-[10px] h-[21px] translate-y-[6px]">12:24</span>
                                    <BubbleLeftAppendix />
                                </div>
                            </div>
                        )
                    ))
                }
            </div>
            <form action={formAction} className="shadow-sm p-[8px] flex items-center gap-[4px]">
                <button type="submit" className="cursor-pointer shrink-0 self-end w-[36px] h-[36px] rounded-full grid place-items-center transition group hover:bg-[#F2F2F2]">
                    <LinkIcon className="text-primary h-[20px] w-[20px]" />
                </button>
                <div className="h-[36px] flex items-center gap-2 rounded-[16px] w-full bg-[#F6F6F7] px-[12px]">
                    <input
                        // value={message}
                        type="text"
                        name="message"
                        // onChange={(e) => setMessage(e.target.value)}
                        className="w-full outline-none" placeholder="Message"
                    />
                </div>
                <button type="submit" className="cursor-pointer shrink-0 self-end w-[36px] h-[36px] rounded-full grid place-items-center transition group hover:bg-[#F2F2F2]">
                    <SendIcon className="ml-[2px]" />
                </button>
            </form>
        </>
    )
}
const BubbleRightAppendix = () => {
    return (
        <svg className="absolute bottom-[-3px] right-[-7.8px]" width="9" height="20"><defs><filter x="-50%" y="-14.7%" width="200%" height="141.2%" filterUnits="objectBoundingBox" id="messageAppendix"><feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset><feGaussianBlur stdDeviation="1" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur><feColorMatrix values="0 0 0 0 0.0621962482 0 0 0 0 0.138574144 0 0 0 0 0.185037364 0 0 0 0.15 0" in="shadowBlurOuter1"></feColorMatrix></filter></defs><g fill="none" fillRule="evenodd"><path d="M6 17H0V0c.193 2.84.876 5.767 2.05 8.782.904 2.325 2.446 4.485 4.625 6.48A1 1 0 016 17z" fill="#000" filter="url(#messageAppendix)"></path><path d="M6 17H0V0c.193 2.84.876 5.767 2.05 8.782.904 2.325 2.446 4.485 4.625 6.48A1 1 0 016 17z" fill="#EEFFDE" className="corner"></path></g></svg>
    )
}

const BubbleLeftAppendix = () => {
    return (
        <svg className="absolute bottom-[-3px] left-[-7.8px]" width="9" height="20"><defs><filter x="-50%" y="-14.7%" width="200%" height="141.2%" filterUnits="objectBoundingBox" id="messageAppendix"><feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset><feGaussianBlur stdDeviation="1" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur><feColorMatrix values="0 0 0 0 0.0621962482 0 0 0 0 0.138574144 0 0 0 0 0.185037364 0 0 0 0.15 0" in="shadowBlurOuter1"></feColorMatrix></filter></defs><g fill="none" fillRule="evenodd"><path d="M3 17h6V0c-.193 2.84-.876 5.767-2.05 8.782-.904 2.325-2.446 4.485-4.625 6.48A1 1 0 003 17z" fill="#000" filter="url(#messageAppendix)"></path><path d="M3 17h6V0c-.193 2.84-.876 5.767-2.05 8.782-.904 2.325-2.446 4.485-4.625 6.48A1 1 0 003 17z" fill="#ffffff"></path></g></svg>
    )
}

/*
right
<svg viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 8 13"><title>tail-out</title><path opacity="0.13" d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z"></path><path fill="currentColor" d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"></path></svg>

check
<svg viewBox="0 0 16 11" height="11" width="16" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title>msg-dblcheck</title><path d="M11.0714 0.652832C10.991 0.585124 10.8894 0.55127 10.7667 0.55127C10.6186 0.55127 10.4916 0.610514 10.3858 0.729004L4.19688 8.36523L1.79112 6.09277C1.7488 6.04622 1.69802 6.01025 1.63877 5.98486C1.57953 5.95947 1.51817 5.94678 1.45469 5.94678C1.32351 5.94678 1.20925 5.99544 1.11192 6.09277L0.800883 6.40381C0.707784 6.49268 0.661235 6.60482 0.661235 6.74023C0.661235 6.87565 0.707784 6.98991 0.800883 7.08301L3.79698 10.0791C3.94509 10.2145 4.11224 10.2822 4.29844 10.2822C4.40424 10.2822 4.5058 10.259 4.60313 10.2124C4.70046 10.1659 4.78086 10.1003 4.84434 10.0156L11.4903 1.59863C11.5623 1.5013 11.5982 1.40186 11.5982 1.30029C11.5982 1.14372 11.5348 1.01888 11.4078 0.925781L11.0714 0.652832ZM8.6212 8.32715C8.43077 8.20866 8.2488 8.09017 8.0753 7.97168C7.99489 7.89128 7.8891 7.85107 7.75791 7.85107C7.6098 7.85107 7.4892 7.90397 7.3961 8.00977L7.10411 8.33984C7.01947 8.43717 6.97715 8.54508 6.97715 8.66357C6.97715 8.79476 7.0237 8.90902 7.1168 9.00635L8.1959 10.0791C8.33132 10.2145 8.49636 10.2822 8.69102 10.2822C8.79681 10.2822 8.89838 10.259 8.99571 10.2124C9.09304 10.1659 9.17556 10.1003 9.24327 10.0156L15.8639 1.62402C15.9358 1.53939 15.9718 1.43994 15.9718 1.32568C15.9718 1.1818 15.9125 1.05697 15.794 0.951172L15.4386 0.678223C15.3582 0.610514 15.2587 0.57666 15.1402 0.57666C14.9964 0.57666 14.8715 0.635905 14.7657 0.754395L8.6212 8.32715Z" fill="currentColor"></path></svg>

left
<svg viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 8 13"><title>tail-in</title><path opacity="0.13" fill="#0000000" d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"></path><path fill="currentColor" d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"></path></svg>

*/