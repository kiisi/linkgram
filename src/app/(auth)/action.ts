"use server"
import { z } from "zod";
import { UserModel } from "@/lib/models/user";
import dbConnect from "@/lib/mongoose";

export interface FormDataProps {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    password: string | null;
    confirmPassword: string | null;
}

export interface ActionResponse {
    success: boolean | null;
    message: string;
    errors?: {
        [K in keyof FormDataProps]?: string[];
    };
    inputs?: {
        [K in keyof FormDataProps]?: string | null;
    };
}

const userSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().min(1, 'Email is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export async function createAccount(prevState: ActionResponse | null, formData: FormData): Promise<ActionResponse> {

    const rawFormData: FormDataProps = {
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        confirmPassword: formData.get('confirmPassword') as string,
    }

    const validatedData = userSchema.safeParse(rawFormData);

    if (!validatedData.success) {
        return {
            success: false,
            message: 'Please fix the errors in the form',
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

        if (isExistingUser) {
            return {
                success: false,
                message: 'An account with this email already exists.',
                inputs: rawFormData,
            }
        }

        const user = await UserModel.create(rawFormData);
        console.log(user);

        return {
            success: true,
            message: 'Account created successfully.',
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