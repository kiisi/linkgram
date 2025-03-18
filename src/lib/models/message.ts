import mongoose, { Schema, Document, Types, Model } from "mongoose";

// Define message sub-document interface
interface IMessage {
    to: Types.ObjectId;
    from: Types.ObjectId;
    text?: string;
    mediaUrl?: string;
    file?: string;
    messageType: "text" | "image" | "video" | "audio" | "file" | "sticker" | "media";
    replyTo?: Types.ObjectId;
    status: "sent" | "delivered" | "seen";
    createdAt: Date;
    updatedAt: Date;
}

// Define One-to-One Message interface
export interface IOneToOneMessage extends Document {
    participants: Types.ObjectId[];
    messages: IMessage[];
}

// Define schema
const messageSchema = new Schema<IOneToOneMessage>(
    {
        participants: [{ type: Schema.Types.ObjectId, ref: "user", required: true }],
        messages: [
            {
                to: { type: Schema.Types.ObjectId, ref: "user", required: true },
                from: { type: Schema.Types.ObjectId, ref: "user", required: true },
                messageType: {
                    type: String,
                    enum: ["text", "image", "video", "audio", "file", "sticker", "media"],
                    required: true
                },
                text: {
                    type: String,
                    trim: true,
                },
                replyTo: { type: Schema.Types.ObjectId, ref: "message", default: null },
                file: { type: String },
                mediaUrl: { type: String },
                status: { type: String, enum: ["sent", "delivered", "seen"], default: "sent" },
                createdAt: { type: Date, default: Date.now },
                updatedAt: { type: Date, default: Date.now },
            },
        ],
    },
    { timestamps: true } // Adds createdAt and updatedAt fields automatically
);

// Define the model
const MessageModel: Model<IOneToOneMessage> =
    mongoose.models.Message ||
    mongoose.model<IMessage>("message", messageSchema);

export default MessageModel;