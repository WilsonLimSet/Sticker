import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { View, ActivityIndicator } from "react-native";
import { auth } from "../api/firebase";
import { AuthContext } from "./AuthProvider";
import { AppTabs } from "./AppTabs";
import { AuthStack } from "./AuthStack";

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
    const { user, login, logout } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // onAuthStateChanged returns an unsubscriber
        const unsubscribeAuth = onAuthStateChanged(
            auth,
            async (authenticatedUser) => {
                authenticatedUser ? login(authenticatedUser) : logout(null);
                setIsLoading(false);
            }
        );
        // unsubscribe auth listener on unmount
        return unsubscribeAuth;
    }, [user]);

    if (isLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {user ? <AppTabs /> : <AuthStack />}
        </NavigationContainer>
    );
};
