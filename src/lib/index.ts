"use server"
import jsonwebtoken from "jsonwebtoken";
import { IUser, UserModel } from "./models/user";
import {cookies} from 'next/headers'

interface JwtTokenDecoderType {
    _id: string;
    iat: number;
    exp: number
};
export async function jwtTokenDecoder(token: string): Promise<IUser | null> {
    const payload = await jsonwebtoken.verify(token, process.env.SECRET_KEY!) as JwtTokenDecoderType;

    const data = await UserModel.findById(payload._id);

    if (data) {
        data.password = undefined;
    }
    return data;
}


export async function getToken() {
    const cookiesStore = await cookies();
    return cookiesStore.get('token')?.value;
}