"use client"
import { MessageTypePusherResponse, UserType } from "@/@types";
import { useChatsContext } from "@/contexts/chats";
import { useUserContext } from "@/contexts/user";
import { pusher } from "@/lib/pusher";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'
export const revalidate = 1

export default function Template({ children }: { children: React.ReactNode }) {

  const params = useParams<{id: string}>();

  const { user } = useUserContext()

  const { chats, dispatch } = useChatsContext()

  const chatIndex = chats.findIndex(item => item._id === params?.id);

  const chatMessages = chats[chatIndex]?.messages

  useEffect(() => {

    if (!user?._id) return; 

    pusher.connection.bind('connected', (callback: unknown) => {
      console.log("Connected ==>", callback);
    });

    const userId = `user__${user?._id}`;

    // Check if already subscribed
    const existingChannel = pusher.channel(userId);
    const userChannel = existingChannel || pusher.subscribe(userId);

    userChannel.bind(userId, (payload: MessageTypePusherResponse) => {
      console.log("Listening", payload);

      const chatId = payload.chatId;
      const data = payload.data;

      if (user?._id === (data.from as UserType)?._id) {
        console.log("Second effect UPDATE_CHAT_MESSAGE", data)
        dispatch({
          type: "UPDATE_CHAT_MESSAGE",
          payload: {
            chatId,
            message: data,
          }
        })
      }
      else {
        console.log("Second effect ADD_CHAT_MESSAGE", data)
        dispatch({
          type: "ADD_CHAT_MESSAGE",
          payload: {
            chatId,
            message: data,
          }
        })
      }
    });

    return () => {
      userChannel.unbind_all();
    };
  }, [user?._id, chats, chatMessages, dispatch]);

  return <div className="template">{children}</div>
}