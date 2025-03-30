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

    const userChannel = pusher.subscribe(`user-${user?._id}`);
    console.log(`user-${user?._id}`)

    userChannel.bind("listen", (payload: MessageTypePusherResponse) => {
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