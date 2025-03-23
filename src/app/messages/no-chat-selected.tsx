import Image from "next/image";
import Link from "next/link";

export default function NoChatSelected() {
    return (
        <div className="h-full w-full bg-white rounded-[8px] grid place-items-center">
            <figure className="grid place-items-center text-center">
                <Image
                    src="/images/chat-selection-white.png"
                    alt="Chat selection"
                    width={142}
                    height={130}
                    className="mb-5"
                />
                <figcaption className="text-[18px] font-semibold text-[#121314] mb-4">No chats selected</figcaption>
                <Link href="/messages" className="sm:hidden text-[#121314] hover:text-primary underline">Go to chat list</Link>
            </figure>
        </div>
    )
}