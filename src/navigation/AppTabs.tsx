import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppParamList } from "./AppParamList";
import { Activity } from "../screens/activity/Activity";
import { Create } from "../screens/create/Create";
import { Explore } from "../screens/explore/Explore";
import { Profile } from "../screens/profile/Profile";
import { HomeStack } from "./app-nav/HomeStack";
import { ProfileStack } from "./app-nav/ProfileStack";

interface AppTabsProps {}

const Tabs = createBottomTabNavigator<AppParamList>();

export const AppTabs: React.FC<AppTabsProps> = ({}) => {
    return (
        <Tabs.Navigator>
            <Tabs.Screen name="HomeStack" component={HomeStack} />
            <Tabs.Screen name="Explore" component={Explore} />
            <Tabs.Screen name="Create" component={Create} />
            <Tabs.Screen name="Activity" component={Activity} />
            <Tabs.Screen name="ProfileStack" component={ProfileStack} />
        </Tabs.Navigator>
    );
};
