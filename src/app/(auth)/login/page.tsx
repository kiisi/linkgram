import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

export default function Page() {

    return (
        <main className="min-h-screen bg-whitesmoke grid place-items-center py-10">
            <div className="w-full max-w-[476px]">
                <header className="grid place-items-center mb-[50px]">
                    <figure className="flex items-center gap-2">
                        <Image
                            src="/logo.svg"
                            alt="Logo"
                            width={40}
                            height={40}
                        />
                        <figcaption className="text-[28px] font-bold tracking-[1px]">Linkgram</figcaption>
                    </figure>
                </header>
                <div className="bg-white rounded-[12px] p-[32px] md:p-[40px]">
                    <div className="mb-[40px]">
                        <h1 className="font-bold text-[24px] md:text-[32px] mb-[8px]">Login</h1>
                        <p className="text-gray-alt">Add your details below to get back into the app</p>
                    </div>
                    <form className="flex flex-col gap-[24px]">
                        <fieldset>
                            <label className="text-[12px] text-gray mb-[4px] inline-block leading-[18px]">Email Address</label>
                            <Input
                                // leading={<EnvelopIcon />}
                                name="email"
                                type="email"
                                placeholder="e.g. alex@email.com"
                            />
                        </fieldset>
                        <fieldset>
                            <label className="text-[12px] text-gray mb-[4px] inline-block leading-[18px]">Password</label>
                            <Input
                                // leading={<PasswordIcon />}
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                            />
                        </fieldset>
                        <Button
                        >
                            Login
                        </Button>
                        <div className="text-center">Don&apos;t have an account? <br className="md:hidden" /><span className="text-primary hover:underline"><Link href="/register">Create account</Link></span></div>
                    </form>
                </div>
            </div>
        </main>
    )
}