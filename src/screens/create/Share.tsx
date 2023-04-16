import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { CreateParamList } from "../../navigation/app-nav/CreateParamList";
import { colors } from "../../styles/colors";

interface ShareProps {
    navigation: StackNavigationProp<CreateParamList, "Share">;
    route: RouteProp<CreateParamList, "Share">;
}

export const Share: React.FC<ShareProps> = ({ navigation, route }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Share the challenge with friends:</Text>
            <Text style={styles.code}>{route.params.code}</Text>
            <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                    navigation.popToTop();
                    navigation.navigate("HomeStack", { screen: "Home" });
                }}
            >
                <Text>Back</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.darkGray,
    },
    text: {
        color: colors.mediumGray,
        paddingBottom: 20,
        fontSize: 20,
    },

    code: {
        color: colors.primary,
        fontSize: 40,
        fontWeight: "bold",
        paddingBottom: 20,
    },

    btn: {
        backgroundColor: colors.mediumGray,
        padding: 10,
        borderRadius: 10,
    },
});
