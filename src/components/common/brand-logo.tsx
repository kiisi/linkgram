import { instrumentSans } from "@/fonts"
import { cn } from "@/lib/utils"
import Image from "next/image"

export const BrandLogoWithLabel = () => {

    return (
        <figure className="flex items-center gap-2">
            <Image
                src="/logo.svg"
                alt="Logo"
                width={40}
                height={40}
            />
            <figcaption className={cn("text-[28px] font-bold tracking-[1px]", instrumentSans.className)}>Linkgram</figcaption>
        </figure>
    )
}