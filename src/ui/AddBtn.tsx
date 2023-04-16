import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { HomeParamList } from "../navigation/app-nav/HomeParamList";
import { StackNavigationProp } from "@react-navigation/stack";
import { CreateParamList } from "../navigation/app-nav/CreateParamList";

interface AddBtnProps {}

export const AddBtn: React.FC<AddBtnProps> = ({}) => {
    const navigation =
        useNavigation<StackNavigationProp<HomeParamList, "Home">>();

    return (
        <TouchableOpacity
            style={{ paddingRight: 20 }}
            onPress={() => navigation.navigate("AddChallenge")}
        >
            <Text style={{ color: "#007AFF", fontSize: 18 }}>ADD</Text>
        </TouchableOpacity>
    );
};
