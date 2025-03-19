"use client"
import { IUser } from '@/lib/models/user';
import React, { createContext, useReducer, ReactNode, useContext, useState } from 'react';

export interface UserContextType {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
}

// Define action types
type Action =
    | { type: 'SET_USER'; payload: IUser | null }
    | { type: 'CLEAR_USER' }

// Define initial state
const initialState: IUser | null = null;

// Define the reducer function
const userReducer = (state: IUser | null, action: Action): IUser | null => {
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

type AuthStatusType = "PENDING" | "AUTHENTICATED" | "UNAUTHENTICATED"

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    // Initialize useReducer with the reducer function and initial state
    const [authStatusType, setAuthStatusType] = useState<AuthStatusType>("PENDING");
    const [user, dispatch] = useReducer(userReducer, initialState);

    console.log(authStatusType, setAuthStatusType)
    // useEffect(() => {
    //     const fetchUser = async () => {
    //         try {
    //             const response = await axios.get("/api/users/me", {
    //                 withCredentials: true, // Ensures cookies are sent
    //             });

    //             console.log(response)

    //             // dispatch({ type: 'SET_USER', payload: _data as IUser });
    //             setAuthStatusType("AUTHENTICATED")
    //         }
    //         catch (error) {
    //             console.log("Error", error);
    //             setAuthStatusType("UNAUTHENTICATED");
    //             redirect('/login')
    //         }
    //     };

    //     fetchUser();
    // }, []);

    // Define the setUser function to dispatch actions
    const setUser = (user: IUser | null) => {
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