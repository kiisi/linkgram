import { Bell } from "lucide-react";
import Image from "next/image";

export default function NavigationBar() {

    return (
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
                    <Bell className="h-5 w-5 text-[#3C3C43]" />
                </button>
                <div className="text-center text-[14.5px] tracking-[1px] leading-[40px] h-[40px] w-[40px] rounded-full bg-primary-alt text-white">
                    DF
                </div>
            </div>
        </nav>
    )
}