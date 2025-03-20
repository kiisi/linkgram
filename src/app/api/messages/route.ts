import { jwtTokenDecoder } from "@/lib";
import MessageModel from "@/lib/models/message";
import { IUser } from "@/lib/models/user";
import dbConnect from "@/lib/mongoose";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {

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
        const token = request.cookies.get('token')

        const data = await jwtTokenDecoder(token?.value ?? '');

        const messages = await MessageModel.find({
            participants: { $in: [data?._id] } // Check if userId exists in the participants array
        })
            .populate("messages.from messages.to participants") // Populate sender and receiver details
            .populate<{ participants: IUser[] }>("participants") // Populate sender and receiver details
            .sort({ "messages.createdAt": -1 })

        return new Response(JSON.stringify({
            success: true,
            message: 'Messages loaded successfully',
            data: messages,
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
