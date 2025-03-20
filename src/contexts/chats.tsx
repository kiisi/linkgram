"use client"
import React, { createContext, useReducer, ReactNode, useContext, useEffect } from 'react';
import { IOneToOneMessage } from '@/lib/models/message';
import axios from 'axios';
import { MessagesResponse } from '@/@types';
import { useQuery } from '@tanstack/react-query';

export interface ChatsContextType {
    chats: IOneToOneMessage[];
    setChats: (data: IOneToOneMessage[]) => void;
    isLoading: boolean;
}

// Define action types
type Action = { type: 'SET_CHATS'; payload: IOneToOneMessage[] }

// Define initial state
const initialState: IOneToOneMessage[] | null = [];

// Define the reducer function
const userReducer = (state: IOneToOneMessage[], action: Action): IOneToOneMessage[] => {
    switch (action.type) {
        case 'SET_CHATS':
            return action.payload;
        default:
            console.log("Unknown Action!")
            return state;
    }
};

const ChatsContext = createContext<ChatsContextType | undefined>(undefined);

// type AuthStatusType = "PENDING" | "AUTHENTICATED" | "UNAUTHENTICATED"

const ChatsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    // Initialize useReducer with the reducer function and initial state
    const [chats, dispatch] = useReducer(userReducer, initialState);

    const { data: messages, isLoading } = useQuery({
        queryKey: ["messages"],
        queryFn: async (): Promise<MessagesResponse> => {
            const response = await axios.get<MessagesResponse>('/api/messages');
            return response?.data;
        },
    });

    useEffect(() => {
        if (messages) {
          dispatch({ type: "SET_CHATS", payload: messages.data });
        }
      }, [messages]);

    // Define the setUser function to dispatch actions
    const setChats = (data: IOneToOneMessage[]) => {
        dispatch({ type: 'SET_CHATS', payload: data });
    };

    return (
        <ChatsContext.Provider value={{ chats, setChats, isLoading }}>
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