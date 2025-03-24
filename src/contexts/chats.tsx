"use client"
import React, { createContext, ReactNode, useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { MessagesResponseType, MessageType, OneToOneMessageType } from '@/@types';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

export interface ChatsType {
    chats: OneToOneMessageType[];
    isLoading?: boolean;
}

type ChatsContextType = ChatsType & {
    dispatch: React.Dispatch<ChatsAction>;
};

const ChatsContext = createContext<ChatsContextType | undefined>(undefined);

type ChatsAction =
    | { type: 'SET_CHATS'; payload: OneToOneMessageType[] }
    | { type: 'ADD_CHAT'; payload: { chatId: string; message: MessageType } }
    | { type: 'UPDATE_CHAT'; payload: { chatId: string; message: MessageType } }
    | { type: 'DELETE_CHAT'; payload: string }

const initialState: ChatsType = {
    chats: [],
};

const chatsReducer = (state: ChatsType, action: ChatsAction): ChatsType => {
    switch (action.type) {
        case 'SET_CHATS':
            return {
                ...state,
                chats: action.payload,
            };
        case 'ADD_CHAT': {

            const chatIndex = state.chats.findIndex(data => data._id === action.payload.chatId);

            // If chat doesn't exist, return unchanged state
            if (chatIndex === -1) {
                return state;
            }

            // Create a new array of chats
            const updatedChats = [...state.chats];

            // Create a new chat object with the message added (maintaining immutability)
            const updatedChat = {
                ...updatedChats[chatIndex],
                messages: [...updatedChats[chatIndex].messages, action.payload.message]
            };

            updatedChats.splice(chatIndex, 1);

            // Add the updated chat to the beginning of the array
            updatedChats.unshift(updatedChat);

            return {
                ...state,
                chats: updatedChats,
            };
        }
        case 'UPDATE_CHAT': {
            const chatToUpdateIndex = state.chats.findIndex(chat => chat._id === action.payload.chatId);

            // If chat doesn't exist, return unchanged state
            if (chatToUpdateIndex === -1) {
                return state;
            }

            // Create a new array of chats
            const updatedChats = [...state.chats];

            // Create a new chat object with the updated properties
            updatedChats[chatToUpdateIndex] = {
                ...updatedChats[chatToUpdateIndex],
                messages: updatedChats[chatToUpdateIndex].messages.map((msg) =>
                    msg._id === action.payload.message._id ? action.payload.message : msg
                ),
            };

            return {
                ...state,
                chats: updatedChats
            };
        }
        // case 'DELETE_CHAT':
        //     return {
        //         ...state,
        //         chats: state.chats.filter((chat) => chat.id !== action.payload),
        //     };
        default:
            return state;
    }
};

const ChatsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [state, dispatch] = useReducer(chatsReducer, initialState);

    const { data, isLoading } = useQuery<MessagesResponseType>({
        queryKey: ["messages"],
        queryFn: async () => {
            const response = await axios.get<MessagesResponseType>("/api/messages");
            return response.data;
        },
    });

    useEffect(() => {
        if (data) {
            dispatch({ type: 'SET_CHATS', payload: data.data });
        }
    }, [data, isLoading]);

    return (
        <ChatsContext.Provider value={{ ...state, isLoading, dispatch }}>
            {isLoading ? (
                <div className='grid place-items-center w-screen h-screen'>
                    <Image
                        src="/logo.svg"
                        alt="Linkgram logo"
                        width={40}
                        height={40}
                    />
                </div>
            ) : children}
        </ChatsContext.Provider>
    )
};

const useChatsContext = () => {
    const context = useContext(ChatsContext);

    if (context === undefined) {
        throw new Error('useChatsContext must be used within a ChatsProvider');
    }

    return context;
};

export { ChatsProvider, useChatsContext };