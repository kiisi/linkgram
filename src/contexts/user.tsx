"use client"
import React, { createContext, useReducer, ReactNode, useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { getToken } from '@/lib';
import { UserType } from '@/@types';

export interface UserContextType {
    user: UserType | null;
    setUser: (user: UserType | null) => void;
}

// Define action types
type Action =
    | { type: 'SET_USER'; payload: UserType | null }
    | { type: 'CLEAR_USER' }

// Define initial state
const initialState: UserType | null = null;

// Define the reducer function
const userReducer = (state: UserType | null, action: Action): UserType | null => {
    switch (action.type) {
        case 'SET_USER':
            return action.payload;
        case 'CLEAR_USER':
            return null;
        default:
            console.log("Unknown Action!")
            return state;
    }
};

const UserContext = createContext<UserContextType | undefined>(undefined);

// type AuthStatusType = "PENDING" | "AUTHENTICATED" | "UNAUTHENTICATED"

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    // Initialize useReducer with the reducer function and initial state
    const [isLoading, setIsLoading] = useState(true);
    const [user, dispatch] = useReducer(userReducer, initialState);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = await getToken();

                const apiResponse = await fetch(new URL(`${process.env.NEXT_PUBLIC_API_BASE}/api/users/me`), {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        'Content-Type': 'application/json',
                        'Cookie': `token=${token}`,
                    },
                });

                const data = await apiResponse.json();

                dispatch({ type: 'SET_USER', payload: data.data as UserType });
            }
            catch (error) {
                console.log("ERROR::", error);
                dispatch({ type: 'SET_USER', payload: {} as UserType });
            }
            finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [isLoading]);

    // Define the setUser function to dispatch actions
    const setUser = (user: UserType | null) => {
        dispatch({ type: 'SET_USER', payload: user });
    };

    // switch (authStatusType) {
    //     case "PENDING":
    //         return (
    //             <div className='grid place-items-center w-screen h-screen'>
    //                 <Image
    //                     src="/logo.svg"
    //                     alt="Linkgram logo"
    //                     width={40}
    //                     height={40}
    //                 />
    //             </div>
    //         );
    //     case "AUTHENTICATED":
    //         return (
    //             <UserContext.Provider value={{ user, setUser }}>
    //                 {children}
    //             </UserContext.Provider>
    //         )
    //     default:
    //         break;
    // }

    if (isLoading) {
        return (
            <div className='grid place-items-center w-screen h-screen'>
                <Image
                    src="/logo.svg"
                    alt="Linkgram logo"
                    width={40}
                    height={40}
                />
            </div>
        )
    }

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
};

const useUserContext = () => {
    const context = useContext(UserContext);

    if (context === undefined) {
        throw new Error('useUserContext must be used within a UserProvider');
    }

    return context;
};

export { UserProvider, useUserContext };