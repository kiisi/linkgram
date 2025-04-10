"use client"
import Image from "next/image";
import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { createNewChat, CreateNewChatActionResponse } from "./action";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/free-mode';
import { CheckCircle2Icon, CircleAlertIcon, MessageCircleIcon, MessageCirclePlus, SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useChatsContext } from "@/contexts/chats";
import { IUser } from "@/lib/models/user";
import { Button } from "@/components/ui/button";
import NewChatDialog from "./new-chat-dialog";
import { Input } from "@/components/ui/input";
import { useUserContext } from "@/contexts/user";
import { usePathname } from "next/navigation";
import { UserType } from "@/@types";
import { DoubleTickIcon, SettingsIcon } from "@/components/common/svgs";

type Tabs = "INBOX" | "MESSAGE_REQUESTS" | "ARCHIVED_CHATS";

const initialState: CreateNewChatActionResponse = {
    success: null,
    message: '',
}

export default function ChatsSideNavigation() {

    const pathname = usePathname()

    const { user } = useUserContext()
    
    const { chats: chatsMessages } = useChatsContext()

    const chatContainerRef = useRef<HTMLDivElement | null>(null);

    const chatRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

    const [state, formAction, isPending] = useActionState(createNewChat, initialState)

    const [tab, setTab] = useState<Tabs>("INBOX");
    const [isSearchInputFocused, setIsSearchInputFocused] = useState(false)
    const [isNewChatDialogOpen, setIsNewChatDialogOpen] = useState(false)

    const inboxTabHandler = () => setTab("INBOX");
    const messageRequestTabHandler = () => setTab("MESSAGE_REQUESTS");
    const archivedChatsTabHandler = () => setTab("ARCHIVED_CHATS");

    const closeNewChatDialogueHandler = () => setIsNewChatDialogOpen(false);

    useEffect(() => {
        if (state?.success) {
            setIsNewChatDialogOpen(false);
        }
    }, [state?.success]);

    return (
        <div className={cn("relative flex flex-col", "w-full sm:max-w-[320px] lg:max-w-[360px]")}>
            <header className="pt-3 pb-4 px-[16px]">
                <div className="flex justify-between items-center mb-3">
                    <h1 className="text-[24px] font-bold">Chats</h1>
                    <div className="flex gap-2 items-center">
                        <button onClick={() => setIsNewChatDialogOpen(true)} className="grid place-items-center cursor-pointer h-[36px] w-[36px] rounded-full bg-[#F6F6F7] hover:bg-[#E4E4E9]">
                            <MessageCirclePlus className="h-5 w-5 text-[#3C3C43]" />
                        </button>
                        <button className="grid place-items-center cursor-pointer h-[36px] w-[36px] rounded-full bg-[#F6F6F7] hover:bg-[#E4E4E9]">
                            <SettingsIcon className="h-5 w-5 text-[#3C3C43]" />
                        </button>
                    </div>
                </div>
                <div className="mb-3 flex items-center gap-[2.5px]">
                    {
                        isSearchInputFocused && (
                            <button className="shrink-0 grid place-items-center cursor-pointer h-[36px] w-[36px] rounded-full hover:bg-[#F2F2F2]">
                                <svg viewBox="0 0 12 13" width="20" height="20" fill="currentColor" aria-hidden="true" className="" style={{ color: '#65686c' }}><g fillRule="evenodd" transform="translate(-450 -1073)"><g fillRule="nonzero"><path d="M100.655 923.405a.75.75 0 0 0-1.06-1.06l-3.125 3.125a.75.75 0 0 0 0 1.06l3.125 3.125a.75.75 0 0 0 1.06-1.06L98.061 926l2.594-2.595z" transform="translate(355 153.5)"></path><path d="M105 925.25h-7.688a.75.75 0 1 0 0 1.5H105a.75.75 0 1 0 0-1.5z" transform="translate(355 153.5)"></path></g></g></svg>
                            </button>
                        )
                    }
                    <div className="h-[36px] flex items-center gap-2 rounded-[16px] w-full bg-[#F6F6F7] px-[8px]">
                        <SearchIcon className="h-5 w-5 text-[#3C3C43]" />
                        <input
                            className="w-full outline-none"
                            placeholder="Search Linkgram"
                            onFocus={() => setIsSearchInputFocused(true)}
                            onBlur={() => setIsSearchInputFocused(false)}
                        />
                    </div>
                </div>
                <Swiper
                    spaceBetween={5}
                    freeMode={true}
                    slidesPerView={"auto"}
                    modules={[FreeMode]}
                    className="flex"
                >
                    <SwiperSlide className="max-w-max cursor-pointer">
                        <div
                            className={cn("text-[15px] px-3 py-[6px] rounded-[16px] flex gap-[4px] items-center select-none", tab === "INBOX" ? "bg-[#F2EEFF] text-primary" : "text-[#65686c] bg-[#F0F2F5]")}
                            onClick={inboxTabHandler}
                        >
                            <MessageCircleIcon className="size-4" />
                            Inbox
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="max-w-max cursor-pointer">
                        <div
                            className={cn("text-[15px] px-3 py-[6px] rounded-[16px] flex gap-[4px] items-center select-none", tab === "MESSAGE_REQUESTS" ? "bg-[#F2EEFF] text-primary" : "text-[#65686c] bg-[#F0F2F5]")}
                            onClick={messageRequestTabHandler}
                        >
                            <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" style={{ color: tab === "MESSAGE_REQUESTS" ? "var(--color-primary)" : "#65686c" }}><g fillRule="evenodd" transform="translate(-446 -398)"><g fillRule="nonzero"><path d="M95.5 219.208a.75.75 0 0 0 1.216.589l4.163-3.297h2.705a3.926 3.926 0 0 0 3.916-3.916v-4.168a3.926 3.926 0 0 0-3.916-3.916h-7.668A3.926 3.926 0 0 0 92 208.416v4.168a3.928 3.928 0 0 0 3.375 3.879l.125.015v2.73zm1.5-3.458a.75.75 0 0 0-.75-.75h-.334a2.426 2.426 0 0 1-2.416-2.416v-4.168A2.426 2.426 0 0 1 95.916 206h7.668a2.426 2.426 0 0 1 2.416 2.416v4.168a2.426 2.426 0 0 1-2.416 2.416h-2.966a.75.75 0 0 0-.466.162L97 217.658v-1.908z" transform="translate(354 194)"></path><path d="M107.285 223.796a.75.75 0 0 0 1.215-.588v-2.73a3.928 3.928 0 0 0 3.5-3.894v-4.168a3.926 3.926 0 0 0-3.916-3.916h-1.334v1.5h1.334a2.426 2.426 0 0 1 2.416 2.416v4.168a2.426 2.426 0 0 1-2.416 2.416h-.334a.75.75 0 0 0-.75.75v1.908l-3.152-2.496a.75.75 0 0 0-.466-.162h-2.966a2.422 2.422 0 0 1-2.117-1.257l-1.313.725a3.922 3.922 0 0 0 3.43 2.032h2.705l4.164 3.296z" transform="translate(354 194)"></path></g></g></svg>
                            Message Requests
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="max-w-max cursor-pointer">
                        <div
                            className={cn("text-[15px] px-3 py-[6px] rounded-[16px] flex gap-[4px] items-center select-none", tab === "ARCHIVED_CHATS" ? "bg-[#F2EEFF] text-primary" : "text-[#65686c] bg-[#F0F2F5]")}
                            onClick={archivedChatsTabHandler}
                        >
                            <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" style={{ color: tab === "ARCHIVED_CHATS" ? "var(--color-primary)" : "#65686c" }}><g fillRule="evenodd" transform="translate(-446 -398)"><g fillRule="nonzero"><path d="M95.5 219.208a.75.75 0 0 0 1.216.589l4.163-3.297h2.705a3.926 3.926 0 0 0 3.916-3.916v-4.168a3.926 3.926 0 0 0-3.916-3.916h-7.668A3.926 3.926 0 0 0 92 208.416v4.168a3.928 3.928 0 0 0 3.375 3.879l.125.015v2.73zm1.5-3.458a.75.75 0 0 0-.75-.75h-.334a2.426 2.426 0 0 1-2.416-2.416v-4.168A2.426 2.426 0 0 1 95.916 206h7.668a2.426 2.426 0 0 1 2.416 2.416v4.168a2.426 2.426 0 0 1-2.416 2.416h-2.966a.75.75 0 0 0-.466.162L97 217.658v-1.908z" transform="translate(354 194)"></path><path d="M107.285 223.796a.75.75 0 0 0 1.215-.588v-2.73a3.928 3.928 0 0 0 3.5-3.894v-4.168a3.926 3.926 0 0 0-3.916-3.916h-1.334v1.5h1.334a2.426 2.426 0 0 1 2.416 2.416v4.168a2.426 2.426 0 0 1-2.416 2.416h-.334a.75.75 0 0 0-.75.75v1.908l-3.152-2.496a.75.75 0 0 0-.466-.162h-2.966a2.422 2.422 0 0 1-2.117-1.257l-1.313.725a3.922 3.922 0 0 0 3.43 2.032h2.705l4.164 3.296z" transform="translate(354 194)"></path></g></g></svg>
                            Archived Chats
                        </div>
                    </SwiperSlide>
                </Swiper>
            </header>
            {
                isSearchInputFocused && (
                    <div className="flex flex-col absolute w-full z-10 h-[calc(100vh_-_158px)] top-[102px] left-0 bg-white py-3 px-2">
                        <div className="w-full rounded-[8px] p-2 cursor-pointer flex item-center gap-2 bg-white hover:bg-[#E6E6E6]">
                            <figure className="text-center text-[14.5px] tracking-[1px] leading-[36px] h-[36px] w-[36px] rounded-full bg-primary-alt text-white">
                                MZ
                            </figure>
                            <p className="flex-1 self-center text-[14.5px]">Marcin Zarcin</p>
                        </div>
                        <div className="w-full rounded-[8px] p-2 cursor-pointer flex item-center gap-2 bg-white hover:bg-[#E6E6E6]">
                            <figure className="text-center text-[14.5px] tracking-[1px] leading-[36px] h-[36px] w-[36px] rounded-full bg-primary-alt text-white">
                                KF
                            </figure>
                            <p className="flex-1 self-center text-[14.5px]">Kiisi Felix</p>
                        </div>
                    </div>
                )
            }
            {
                chatsMessages?.length !== 0 && (
                    <div ref={chatContainerRef} className="flex-1 flex flex-col pb-2 gap-[4px] overflow-y-auto pl-[10px] pr-[10px]">
                        {
                            chatsMessages?.map((data, index) => {

                                let participant = data.participants.find(data => typeof data !== "string" && data._id !== user?._id);
                                if (!participant) {
                                    participant = data.participants[0]
                                }

                                const message = data.messages[data.messages.length - 1];

                                const isChatActive = '/messages/' + data._id === pathname;

                                const isCurrentUser = (user?._id === message.from) || (user?._id === (message.from as UserType)._id);

                                const isTopItem = index === 0;

                                const chatRef = (el: HTMLAnchorElement | null) => {
                                    if (chatRefs?.current) {
                                        chatRefs.current[data._id] = el;
                                    }
                                };
                                
                                const containerRefTop = chatContainerRef?.current?.getBoundingClientRect()?.top;

                                const chatRefsTop = chatRefs?.current[data._id]?.getBoundingClientRect()?.top

                                const isChatValidToSlideUp = (containerRefTop !== chatRefsTop) && isTopItem;

                                return (
                                    <Link
                                        href={'/messages/' + data._id}
                                        key={data._id}
                                        ref={chatRef}
                                        className={cn("group relative p-[6px] flex gap-[8px] items-center rounded-[8px] z-[1] bg-white z-[2]",
                                            isChatActive ? "bg-primary" : "hover:bg-[#f4f4f5]",
                                            isChatValidToSlideUp && "animate-slide-up"
                                        )}
                                    >
                                        <figure>
                                            <div className="text-center text-[14.5px] tracking-[1px] leading-[56px] h-[56px] w-[56px] rounded-full bg-primary-alt text-white">
                                                {(participant as IUser)?.firstName[0] + "" + (participant as IUser)?.lastName[0]}
                                            </div>
                                        </figure>
                                        <div>
                                            <h2 className={cn("text-[16px] break-all font-normal line-clamp-1", isChatActive ? "text-white" : "text-black")}>
                                                {(participant as IUser)?.firstName + " " + (participant as IUser)?.lastName}
                                            </h2>
                                            <p className={cn("text-[13.5px] font-light break-all line-clamp-1", isChatActive ? "text-white" : "text-[#3B4A54]")}>
                                                {isCurrentUser && <DoubleTickIcon className="inline mt-[-4.5px]" />} {message?.text}
                                            </p>
                                        </div>
                                        <div className="cursor-pointer hidden group-hover:grid absolute right-[8px] shadow-md top-[50%] translate-y-[-50%] h-[32px] w-[32px] bg-white place-items-center rounded-full">
                                            <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor" aria-hidden="true" style={{ color: "#65686c" }}><g fillRule="evenodd" transform="translate(-446 -398)"><path d="M458 408a2 2 0 1 1-4 0 2 2 0 0 1 4 0m6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0"></path></g></svg>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                )
            }
            {
                chatsMessages?.length === 0 && (
                    <div className="w-full flex-1 text-center grid place-items-center">
                        <figure className="grid place-items-center">
                            <Image
                                src="/images/chat-message-white.png"
                                alt="Chat Message"
                                width={142}
                                height={130}
                                className="mb-5 select-none"
                            />
                            <figcaption className="text-[18px] font-semibold text-[#121314]">No messages</figcaption>
                            <p className="text-[#65686c] text-[14.5px]">New messages will appear here.</p>
                        </figure>
                    </div>
                )
            }
            <NewChatDialog
                isOpen={isNewChatDialogOpen}
                onClose={closeNewChatDialogueHandler}
            >
                <form action={formAction} className="flex flex-col gap-[24px]">
                    <header>
                        <h1 className="text-[18px] font-semibold text-[#121414]">Create A New Chat</h1>
                    </header>
                    <div>
                        <fieldset className="mb-[12px]">
                            <label className="text-[12px] text-gray mb-[4px] inline-block leading-[18px]">Email Address</label>
                            <Input
                                name="email"
                                type="email"
                                placeholder="alex@email.com"
                                defaultValue={state?.inputs?.email ?? ''}
                                isError={Boolean(state?.errors?.email)}
                            />
                            {state?.errors?.email && (
                                <p id="email-error" className="text-[13.5px] text-red-500 pt-[4px]">
                                    {state.errors.email[0]}
                                </p>
                            )}
                        </fieldset>
                        <fieldset>
                            <label className="text-[12px] text-gray mb-[4px] inline-block leading-[18px]">Message</label>
                            <Input
                                name="message"
                                type="text"
                                placeholder="Message"
                                defaultValue={state?.inputs?.message ?? ''}
                                isError={Boolean(state?.errors?.message)}
                            />
                            {state?.errors?.message && (
                                <p id="message-error" className="text-[13.5px] text-red-500 pt-[4px]">
                                    {state.errors.message[0]}
                                </p>
                            )}
                        </fieldset>
                    </div>
                    {
                        state?.success === false && (
                            <div className="flex gap-2 min-h-[60px] w-full rounded-[8px] border-red border-1 p-2">
                                <div className="pt-[2px]">
                                    <CircleAlertIcon className="h-5 w-5 text-red" />
                                </div>
                                <div>
                                    <h2 className="text-red font-medium text-[14.5px]">Error!</h2>
                                    <p className="text-red text-[13.5px]">{state.message}</p>
                                </div>
                            </div>
                        )
                    }
                    {
                        state?.success && (
                            <div className="flex gap-2 min-h-[60px] w-full rounded-[8px] border-green-500 border-1 p-2">
                                <div className="pt-[2px]">
                                    <CheckCircle2Icon className="h-5 w-5 text-green-500" />
                                </div>
                                <div>
                                    <h2 className="text-green-500 font-medium text-[14.5px]">Success!</h2>
                                    <p className="text-green-500 text-[13.5px]">{state.message}</p>
                                </div>
                            </div>
                        )
                    }
                    <div>
                        <Button type="submit" isLoading={isPending} className="w-full">
                            Create
                        </Button>
                    </div>
                </form>
            </NewChatDialog>
        </div>
    )
}