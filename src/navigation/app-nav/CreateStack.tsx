import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { CreateParamList } from "./CreateParamList";
import { Create } from "../../screens/create/Create";
import { Share } from "../../screens/create/Share";

interface CreateStackProps {}

const Stack = createStackNavigator<CreateParamList>();

export const CreateStack: React.FC<CreateStackProps> = ({}) => {
    return (
        <Stack.Navigator initialRouteName="Create">
            <Stack.Screen name="Create" component={Create} />
            <Stack.Screen name="Share" component={Share} />
        </Stack.Navigator>
    );
};
