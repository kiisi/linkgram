"use server"
import { jwtTokenDecoder } from "@/lib";
import MessageModel from "@/lib/models/message";
import { UserModel } from "@/lib/models/user";
import dbConnect from "@/lib/mongoose";
import { cookies } from "next/headers";
import { z } from "zod";

export interface CreateNewChatFormDataProps {
    email: string | null;
    message: string | null;
}

export interface CreateNewChatActionResponse {
    success: boolean | null;
    message: string;
    errors?: {
        [K in keyof CreateNewChatFormDataProps]?: string[];
    };
    inputs?: {
        [K in keyof CreateNewChatFormDataProps]?: string | null;
    };
}


const createNewChatSchema = z.object({
    email: z.string().email("Invalid email address"),
    message: z.string().min(1, 'Message is required'),
})

export async function createNewChat(prevState: CreateNewChatActionResponse | null, formData: FormData): Promise<CreateNewChatActionResponse> {

    const rawFormData: CreateNewChatFormDataProps = {
        email: formData.get('email') as string,
        message: formData.get('message') as string,
    }

    const validatedData = createNewChatSchema.safeParse(rawFormData);

    if (!validatedData.success) {
        return {
            success: false,
            message: 'Please fix the error in the form',
            errors: validatedData.error.flatten().fieldErrors,
            inputs: rawFormData,
        }
    }

    try {
        await dbConnect();
    }
    catch (error) {
        console.log(error)
        return {
            success: false,
            message: 'An error occured while connecting to the server',
        }
    }

    try {
        const isExistingUser = await UserModel.findOne({ email: rawFormData.email })

        if (!isExistingUser) {
            return {
                success: false,
                message: 'This person is not on Linkgram. Invite to Linkgram',
                inputs: rawFormData,
            }
        }

        const cookieStore = await cookies();

        const token = cookieStore.get('token')

        const data = await jwtTokenDecoder(token?.value ?? '');
        const userId = data?._id;

        await MessageModel.create({
            participants: [userId, isExistingUser._id],
            messages: [
                {
                    to: isExistingUser._id,
                    from: userId,
                    messageType: "text",
                    text: rawFormData.message,
                    status: "sent",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            ],
        })

        return {
            success: true,
            message: 'This user has been added to your chat.',
        }
    }
    catch (error) {
        console.log(error)
        return {
            success: false,
            message: 'An unknown error occured',
        }
    }
}