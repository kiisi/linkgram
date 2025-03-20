import Image from "next/image";

export default function Page() {

    return (
        <>
            <div className="h-full w-full bg-white rounded-[8px] grid place-items-center">
                <figure>
                    <Image
                        src="/images/chat-selection-white.png"
                        alt="Chat selection"
                        width={142}
                        height={130}
                        className="mb-5"
                    />
                    <figcaption className="text-[18px] font-semibold text-[#121314]">No chat selected</figcaption>
                </figure>
            </div>
        </>
    )
}