import { MessageType } from "@/@types";
import MessageModel from "@/lib/models/message";
import dbConnect from "@/lib/mongoose";
import { NextRequest } from "next/server";
import Pusher from "pusher";

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.PUSHER_APP_KEY!,
    secret: process.env.PUSHER_APP_SECRET!,
    cluster: process.env.PUSHER_APP_CLUSTER!,
    useTLS: true,
});

export async function POST(request: NextRequest) {

    const body = await request.json();

    const payload = body.data as MessageType;
    const event = body.event as string;
    const channel = body.channel as string;

    try {
        await dbConnect();
    }
    catch (error) {
        console.log(error)
        return new Response(JSON.stringify({
            success: false,
            message: 'An error occured while connecting to the server',
            data: null,
        }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {

        const refinedData: MessageType = {
            _id: payload._id,
            from: payload.from,
            to: payload.to,
            status: "sent",
            messageType: "text",
            text: payload.text,
        }

        const conversation = await MessageModel.findByIdAndUpdate(
            payload.chatId,
            { $push: { messages: refinedData } },
            { new: true }
        )
        .populate("messages.from messages.to")
        .exec();

        const data = conversation?.messages.find((item) => item._id.toString() === refinedData._id);

        await pusher.trigger(channel, event, data);

        conversation?.participants.forEach(async (user) => {
            const userId = user.toString();
            const userChannel = `user-${userId}`;

            await pusher.trigger(userChannel, "listen", {
                chatId: conversation._id,
                data,
            });
        });

        return new Response(JSON.stringify({
            success: true,
            message: 'Message sent successfully',
            data,
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    catch (error) {
        console.log(error)

        return new Response(JSON.stringify({
            success: false,
            message: 'An unknown error occured on the server',
            data: null,
        }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
