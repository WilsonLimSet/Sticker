import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Profile } from "../../screens/profile/Profile";
import { EditProfile } from "../../screens/profile/EditProfile";

interface HomeStackProps {}

const Stack = createStackNavigator();

export const ProfileStack: React.FC<HomeStackProps> = ({}) => {
    return (
        <Stack.Navigator 
            screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{ 
                headerShown: true,
                }}
            />
            <Stack.Screen
                name="EditProfile"
                component={EditProfile}
                options={{ 
                headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
};
