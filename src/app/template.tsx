"use client"
import { MessageTypePusherResponse, UserType } from "@/@types";
import { useChatsContext } from "@/contexts/chats";
import { useUserContext } from "@/contexts/user";
import { pusher } from "@/lib/pusher";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Template({ children }: { children: React.ReactNode }) {

  const params = useParams<{id: string}>();

  const { user } = useUserContext()

  const { chats, dispatch } = useChatsContext()

  const chatIndex = chats.findIndex(item => item._id === params?.id);

  const chatMessages = chats[chatIndex]?.messages

  useEffect(() => {

    if (!user?._id) return;

    const userId = `user-${user?._id}`

    const userChannel = pusher.subscribe(userId);

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
      userChannel.unsubscribe();
    };
  }, [user?._id, chats, chatMessages, dispatch]);

  return <div className="Template">{children}</div>
}