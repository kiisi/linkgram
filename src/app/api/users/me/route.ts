import { jwtTokenDecoder } from "@/lib";
import { UserModel } from "@/lib/models/user";
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

        const user = await UserModel.findById(data?._id);

        if(!user) {
            return new Response(JSON.stringify({
                success: false,
                message: 'Not authenticated!',
                data: null,
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            }); 
        }

        return new Response(JSON.stringify({
            success: true,
            message: 'Authentication successful!',
            data: user,
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
