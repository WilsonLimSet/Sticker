import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/home/Home";
import { AppParamList } from "./AppParamList";
import { Activity } from "../screens/activity/Activity";
import { Create } from "../screens/create/Create";
import { Explore } from "../screens/explore/Explore";
import { Profile } from "../screens/profile/Profile";

interface AppTabsProps {}

const Tabs = createBottomTabNavigator<AppParamList>();

export const AppTabs: React.FC<AppTabsProps> = ({}) => {
    return (
        <Tabs.Navigator>
            <Tabs.Screen name="Home" component={Home} />
            <Tabs.Screen name="Explore" component={Explore} />
            <Tabs.Screen name="Create" component={Create} />
            <Tabs.Screen name="Activity" component={Activity} />
            <Tabs.Screen name="Profile" component={Profile} />
        </Tabs.Navigator>
    );
};
