"use client"
import { BellRing, MessageCircle, MessageCirclePlus, Search } from "lucide-react";
import Image from "next/image";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/free-mode';

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="h-screen">
            <nav className="h-[56px] bg-white shadow-sm flex justify-between items-center px-[16px]">
                <figure>
                    <Image
                        src="/logo.svg"
                        alt="Logo"
                        width={40}
                        height={40}
                    />
                </figure>
                <div className="flex items-center gap-2">
                    <button className="grid place-items-center cursor-pointer h-[40px] w-[40px] rounded-full bg-[#F6F6F7] hover:bg-[#E4E4E9]">
                        <BellRing className="h-5 w-5 text-[#3C3C43]" />
                    </button>
                    <div className="text-center text-[14.5px] tracking-[1px] leading-[40px] h-[40px] w-[40px] rounded-full bg-primary-alt text-white">
                        DF
                    </div>
                </div>
            </nav>
            <div className="h-[calc(100vh_-_56px)] w-full flex">
                <div className="ml-[-300px] md:ml-0 w-full max-w-[300px] px-[16px]">
                    <header className="pt-3 pb-2">
                        <div className="flex justify-between items-center mb-3">
                            <h1 className="text-[24px] font-bold">Chats</h1>
                            <button className="grid place-items-center cursor-pointer h-[36px] w-[36px] rounded-full bg-[#F6F6F7] hover:bg-[#E4E4E9]">
                                <MessageCirclePlus className="h-5 w-5 text-[#3C3C43]" />
                            </button>
                        </div>
                        <div className="h-[36px] flex items-center gap-2 rounded-[16px] w-full bg-[#F6F6F7] hover:bg-[#E4E4E9] px-[8px] mb-3">
                            <Search className="h-5 w-5 text-[#3C3C43]" />
                            <input className="w-full outline-none" placeholder="Search Linkgram" />
                        </div>
                        <Swiper
                            spaceBetween={5}
                            freeMode={true}
                            slidesPerView={"auto"}
                            modules={[FreeMode]}
                            className="flex"
                        >
                            <SwiperSlide className="max-w-max cursor-pointer">
                                <div className="bg-[#F2EEFF] text-primary text-[15px] px-3 py-[6px] rounded-[16px] flex gap-[4px] items-center">
                                    <MessageCircle className="size-4" />
                                    Inbox
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="max-w-max cursor-pointer">
                                <div className="bg-[#F2EEFF] text-primary text-[15px] px-3 py-[6px] rounded-[16px] flex gap-[4px] items-center">
                                    <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" style={{ color: "var(--color-primary)" }}><g fillRule="evenodd" transform="translate(-446 -398)"><g fillRule="nonzero"><path d="M95.5 219.208a.75.75 0 0 0 1.216.589l4.163-3.297h2.705a3.926 3.926 0 0 0 3.916-3.916v-4.168a3.926 3.926 0 0 0-3.916-3.916h-7.668A3.926 3.926 0 0 0 92 208.416v4.168a3.928 3.928 0 0 0 3.375 3.879l.125.015v2.73zm1.5-3.458a.75.75 0 0 0-.75-.75h-.334a2.426 2.426 0 0 1-2.416-2.416v-4.168A2.426 2.426 0 0 1 95.916 206h7.668a2.426 2.426 0 0 1 2.416 2.416v4.168a2.426 2.426 0 0 1-2.416 2.416h-2.966a.75.75 0 0 0-.466.162L97 217.658v-1.908z" transform="translate(354 194)"></path><path d="M107.285 223.796a.75.75 0 0 0 1.215-.588v-2.73a3.928 3.928 0 0 0 3.5-3.894v-4.168a3.926 3.926 0 0 0-3.916-3.916h-1.334v1.5h1.334a2.426 2.426 0 0 1 2.416 2.416v4.168a2.426 2.426 0 0 1-2.416 2.416h-.334a.75.75 0 0 0-.75.75v1.908l-3.152-2.496a.75.75 0 0 0-.466-.162h-2.966a2.422 2.422 0 0 1-2.117-1.257l-1.313.725a3.922 3.922 0 0 0 3.43 2.032h2.705l4.164 3.296z" transform="translate(354 194)"></path></g></g></svg>
                                    Message Requests
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="max-w-max cursor-pointer">
                                <div className="bg-[#F2EEFF] text-primary text-[15px] px-3 py-[6px] rounded-[16px] flex gap-[4px] items-center">
                                    <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" style={{ color: "var(--color-primary)" }}><g fillRule="evenodd" transform="translate(-446 -398)"><g fillRule="nonzero"><path d="M95.5 219.208a.75.75 0 0 0 1.216.589l4.163-3.297h2.705a3.926 3.926 0 0 0 3.916-3.916v-4.168a3.926 3.926 0 0 0-3.916-3.916h-7.668A3.926 3.926 0 0 0 92 208.416v4.168a3.928 3.928 0 0 0 3.375 3.879l.125.015v2.73zm1.5-3.458a.75.75 0 0 0-.75-.75h-.334a2.426 2.426 0 0 1-2.416-2.416v-4.168A2.426 2.426 0 0 1 95.916 206h7.668a2.426 2.426 0 0 1 2.416 2.416v4.168a2.426 2.426 0 0 1-2.416 2.416h-2.966a.75.75 0 0 0-.466.162L97 217.658v-1.908z" transform="translate(354 194)"></path><path d="M107.285 223.796a.75.75 0 0 0 1.215-.588v-2.73a3.928 3.928 0 0 0 3.5-3.894v-4.168a3.926 3.926 0 0 0-3.916-3.916h-1.334v1.5h1.334a2.426 2.426 0 0 1 2.416 2.416v4.168a2.426 2.426 0 0 1-2.416 2.416h-.334a.75.75 0 0 0-.75.75v1.908l-3.152-2.496a.75.75 0 0 0-.466-.162h-2.966a2.422 2.422 0 0 1-2.117-1.257l-1.313.725a3.922 3.922 0 0 0 3.43 2.032h2.705l4.164 3.296z" transform="translate(354 194)"></path></g></g></svg>
                                    Archived Chats
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </header>
                </div>
                <main className="bg-[#f2f4f7] p-[12px] flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}