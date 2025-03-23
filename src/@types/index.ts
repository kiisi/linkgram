export interface MessagesResponseType {
    success: boolean,
    message: string;
    data: OneToOneMessageType[],
}

export interface UserType {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
}

export interface OneToOneMessageType {
    _id: string;
    participants: string[] | UserType[];
    messages: MessageType[];
}

export interface MessageType {
    _id?: string;
    tempId?: string;
    chatId?: string;
    to: string | UserType;
    from: string | UserType;
    text?: string;
    mediaUrl?: string;
    file?: string;
    messageType: "text" | "image" | "video" | "audio" | "file" | "sticker" | "media";
    replyTo?: string;
    status: "sending" | "sent" | "delivered" | "seen";
    updatedAt?: string;
    createdAt?: string;
}
