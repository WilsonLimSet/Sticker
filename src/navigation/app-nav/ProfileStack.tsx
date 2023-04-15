import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Profile } from "../../screens/profile/Profile";
import { EditProfile } from "../../screens/profile/EditProfile";

interface HomeStackProps {}

const Stack = createStackNavigator();

export const ProfileStack: React.FC<HomeStackProps> = ({}) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
        </Stack.Navigator>
    );
};
