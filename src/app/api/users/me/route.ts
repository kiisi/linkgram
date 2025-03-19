import { UserModel } from "@/lib/models/user";
import dbConnect from "@/lib/mongoose";
import jsonwebtoken from "jsonwebtoken";
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
        console.log("Token ==>", token)
        console.log("Token Value ==>", token?.value)

        const payload = await jsonwebtoken.verify(token?.value ?? '', process.env.SECRET_KEY!) as { _id: string; iat: number; exp: number };

        const data = await UserModel.findById(payload._id);
        
        if(data){
            data.password = undefined;
        }

        return new Response(JSON.stringify({
            success: true,
            message: 'Authentication successful!',
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
            message: 'An error occured while connecting to the server',
            data: null,
        }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
