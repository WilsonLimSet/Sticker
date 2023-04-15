import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../../screens/home/Home";
import { HomeParamList } from "./HomeParamList";
import { Challenge } from "../../screens/home/challenge/Challenge";
import { LogProgress } from "../../screens/home/challenge/LogProgress";
import { TakePhoto } from "../../screens/home/challenge/TakePhoto";
import { DeleteChallenge } from "../../screens/home/challenge/DeleteChallenge";

interface HomeStackProps {}

const Stack = createStackNavigator<HomeParamList>();

export const HomeStack: React.FC<HomeStackProps> = ({}) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="ViewChallenge" component={Challenge} />
            <Stack.Screen name="LogProgress" component={LogProgress} />
            <Stack.Screen name="TakePhoto" component={TakePhoto} />
            <Stack.Screen name="DeleteChallenge" component={DeleteChallenge} />
        </Stack.Navigator>
    );
};
