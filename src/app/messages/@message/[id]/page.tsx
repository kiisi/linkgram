
import dynamic from "next/dynamic"

const Message = dynamic(()=>import("./message"))

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    return (
        <Message id={id} />
    )
}