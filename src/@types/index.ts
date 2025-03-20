import { IOneToOneMessage } from "@/lib/models/message";

export interface MessagesResponse {
    success: boolean,
    message: string;
    data: IOneToOneMessage[],
}