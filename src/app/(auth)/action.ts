"use server"
import { z } from "zod";
import { UserModel } from "@/lib/models/user";
import dbConnect from "@/lib/mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from 'next/headers'

export interface FormDataProps {
    firstName?: string | null;
    lastName?: string | null;
    email: string | null;
    password: string | null;
    confirmPassword?: string | null;
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

const userRegistrationSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email("Invalid email address"),
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

    const validatedData = userRegistrationSchema.safeParse(rawFormData);

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

        const hashedPassword = await bcrypt.hash(rawFormData.password!, 12);

        rawFormData.password = hashedPassword;

        await UserModel.create(rawFormData);

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

const userLoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

export async function loginAccount(prevState: ActionResponse | null, formData: FormData): Promise<ActionResponse> {

    const rawFormData: FormDataProps = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const validatedData = userLoginSchema.safeParse(rawFormData);

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

        if (!isExistingUser) {
            return {
                success: false,
                message: 'This account does not exists.',
                inputs: rawFormData,
            }
        }

        const isPasswordValid = await bcrypt.compare(rawFormData.password!, isExistingUser.password!);

        if (!isPasswordValid) {
            return {
                success: false,
                message: 'Invalid credentials',
                inputs: rawFormData,
            }
        }

        const token = jwt.sign({ _id: isExistingUser._id }, process.env.SECRET_KEY!, { expiresIn: "7d" });

        const cookieStore = await cookies();

        cookieStore.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return {
            success: true,
            message: 'Login successful.',
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