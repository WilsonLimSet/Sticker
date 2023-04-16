import React, { useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Alert,
} from "react-native";
import { colors } from "../../styles/colors";
import {
    arrayUnion,
    collection,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { auth, database } from "../../api/firebase";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeParamList } from "../../navigation/app-nav/HomeParamList";

interface AddChallengeProps {
    navigation: StackNavigationProp<HomeParamList, "AddChallenge">;
}

export const AddChallenge: React.FC<AddChallengeProps> = ({ navigation }) => {
    const user = auth.currentUser;
    const [code, setCode] = useState("");

    const joinChallenge = async () => {
        const collectionRef = collection(database, "userChallenges");
        const q = query(collectionRef, where("shareCode", "==", code.trim()));

        // o1Smti
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot.empty);
        if (querySnapshot.empty) {
            Alert.alert("Incorrect Challenge Code");
        } else {
            updateDoc(querySnapshot.docs[0].ref, {
                friends: arrayUnion(user?.uid),
            });
            setCode("");
            navigation.goBack();
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Enter Challenge Code</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(code) => {
                    setCode(code);
                }}
                placeholder="Code"
                autoCapitalize="none"
                autoCorrect={false}
                spellCheck={false}
            />
            <TouchableOpacity style={styles.btn} onPress={joinChallenge}>
                <Text>Join Challenge</Text>
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

    textInput: {
        paddingHorizontal: 15,
        backgroundColor: "white",
        height: 46,
        width: 100,
        borderRadius: 7,
        paddingLeft: 10,
        marginBottom: 20,
    },
});
