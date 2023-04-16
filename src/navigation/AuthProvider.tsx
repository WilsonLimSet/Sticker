import { User } from "firebase/auth";
import React, { useState } from "react";

export const AuthContext = React.createContext<{
    user: null | User;
    login: (user: User) => void;
    logout: (user: null) => void;
}>({
    user: null,
    login: (user) => {},
    logout: (user) => {},
});

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<null | User>(null);
    return (
        <AuthContext.Provider
            value={{
                user,
                login: (user) => {
                    setUser(user);
                },
                logout: (user) => {
                    setUser(user);
                },
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
