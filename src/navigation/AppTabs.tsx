import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppParamList } from "./AppParamList";
import { Activity } from "../screens/activity/Activity";
import { Create } from "../screens/create/Create";
import { Explore } from "../screens/explore/Explore";
import { HomeStack } from "./app-nav/HomeStack";
import { ProfileStack } from "./app-nav/ProfileStack";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { colors } from "../styles/colors";

interface AppTabsProps {}

const Tabs = createBottomTabNavigator<AppParamList>();

export const AppTabs: React.FC<AppTabsProps> = ({ routeName }) => {
    return (
        <Tabs.Navigator
            tabBarOptions={{
                showLabel: false,
            }}
            barStyle={{
                display: routeName === "Take Photo" ? "none" : "flex",
                backgroundColor: colors.tabBar,
                position: "absolute",
                overflow: "hidden",
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
            }}
            activeColor={colors.darkGray}
            screenOptions={{ headerShown: true }}
        >
            <Tabs.Screen
                name="HomeStack"
                component={HomeStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="home"
                            color={color}
                            size={26}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="Explore"
                component={Explore}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="magnify"
                            color={color}
                            size={26}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="Create"
                component={Create}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="plus-circle"
                            color={color}
                            size={26}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="Activity"
                component={Activity}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons
                            name="dynamic-feed"
                            color={color}
                            size={26}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="ProfileStack"
                component={ProfileStack}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="account-circle"
                            color={color}
                            size={26}
                        />
                    ),
                }}
            />
        </Tabs.Navigator>
    );
};
