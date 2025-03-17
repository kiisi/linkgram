"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { ActionResponse, loginAccount } from "../action";
import { CheckCircle2, CircleAlert } from "lucide-react";

const initialState: ActionResponse = {
    success: null,
    message: '',
}

export default function Page() {

    const router = useRouter();

    const [state, formAction, isPending] = useActionState(loginAccount, initialState)

    useEffect(() => {
        if (state?.success) {
            // Redirect after a short delay to show the success message
            setTimeout(() => {
                router.push("/"); // Change to the desired page
            }, 2000); // 2 seconds delay before redirecting
        }
    }, [state?.success, router]);

    return (
        <main className="min-h-screen bg-whitesmoke grid place-items-center py-10">
            <div className="w-full max-w-[560px]">
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
                    <form action={formAction} className="flex flex-col gap-[24px]">
                        <fieldset>
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
                            <label className="text-[12px] text-gray mb-[4px] inline-block leading-[18px]">Password</label>
                            <Input
                                type="password"
                                name="password"
                                placeholder="••••••••••••••••••"
                                defaultValue={state?.inputs?.password ?? ''}
                                isError={Boolean(state?.errors?.password)}
                            />
                            {state?.errors?.password && (
                                <p id="password-error" className="text-[13.5px] text-red-500 pt-[4px]">
                                    {state.errors.password[0]}
                                </p>
                            )}
                        </fieldset>
                        {
                            state?.success === false && (
                                <div className="flex gap-2 min-h-[60px] w-full rounded-[8px] border-red border-1 p-2">
                                    <div className="pt-[2px]">
                                        <CircleAlert className="h-5 w-5 text-red" />
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
                                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                                    </div>
                                    <div>
                                        <h2 className="text-green-500 font-medium text-[14.5px]">Success!</h2>
                                        <p className="text-green-500 text-[13.5px]">{state.message}</p>
                                    </div>
                                </div>
                            )
                        }
                        <Button
                            isLoading={isPending}
                            type="submit"
                        >
                            Login
                        </Button>
                        <div className="text-center text-[14.5px]">Don&apos;t have an account? <span className="text-primary hover:underline"><Link href="/register">Create account</Link></span></div>
                    </form>
                </div>
            </div>
        </main>
    )
}