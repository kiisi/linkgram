"use client"
import React, { createContext, ReactNode, useContext } from 'react';
import axios from 'axios';
import { MessagesResponseType, OneToOneMessageType } from '@/@types';
import { useQuery } from '@tanstack/react-query';

export interface ChatsContextType {
    chats: OneToOneMessageType[];
    isLoading: boolean;
}

const ChatsContext = createContext<ChatsContextType | undefined>(undefined);

// type AuthStatusType = "PENDING" | "AUTHENTICATED" | "UNAUTHENTICATED"

const ChatsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const { data, isLoading } = useQuery<MessagesResponseType>({
        queryKey: ["messages"],
        queryFn: async () => {
            const response = await axios.get<MessagesResponseType>("/api/messages");
            return response.data;
        },
    });

    return (
        <ChatsContext.Provider value={{ chats: data?.data ?? [], isLoading }}>
            {children}
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