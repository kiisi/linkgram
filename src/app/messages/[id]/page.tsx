
import Message from "./message"
import Image from "next/image"

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    return (
        <>
            {
                id ? (
                    <Message />
                ) : (
                    <div className="h-full w-full bg-white rounded-[8px] grid place-items-center">
                        <figure>
                            <Image
                                src="/images/chat-selection-white.png"
                                alt="Chat selection"
                                width={142}
                                height={130}
                                className="mb-5"
                            />
                            <figcaption className="text-[18px] font-semibold text-[#121314]">No chats selected</figcaption>
                        </figure>
                    </div>
                )
            }
        </>
    )
}