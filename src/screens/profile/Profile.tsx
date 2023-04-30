import React from "react";
import { auth } from "../../api/firebase";
import { signOut } from "firebase/auth";
import {
    SafeAreaView,
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
} from "react-native";
import { colors } from "../../styles/colors";

interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = ({ navigation }) => {
    console.log(auth.currentUser);
    const user = auth.currentUser;
    const profileImageUrl = user.photoURL;
    const onSignOut = () => {
        signOut(auth).catch((error) =>
            console.log("Error logging out: ", error)
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <View style={styles.userImgContainer}>
                    <Image
                        source={{ uri: profileImageUrl }}
                        style={styles.userImg}
                    />
                </View>

                <SafeAreaView style={styles.form}>
                    <Text
                        style={{
                            fontWeight: "bold",
                            alignSelf: "center",
                            color: "white",
                            fontSize: 18,
                            marginTop: 23,
                        }}
                    >
                        {" "}
                        Welcome {auth?.currentUser?.displayName}{" "}
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={onSignOut}>
                        <Text
                            style={{
                                fontWeight: "bold",
                                color: "black",
                                fontSize: 18,
                            }}
                        >
                            Log Out
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate("EditProfile")}
                    >
                        <Text
                            style={{
                                fontWeight: "bold",
                                color: "black",
                                fontSize: 18,
                            }}
                        >
                            Edit Profile
                        </Text>
                    </TouchableOpacity>
                </SafeAreaView>
                <StatusBar barStyle="light-content" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkGray,
    },
    subContainer: {
        height: 690,
        justifyContent: "center",
    },
    userImgContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    userImg: {
        height: 150,
        width: 150,
        borderRadius: 75,
        overflow: "hidden",
    },
    title: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#B8DCEA",
        alignSelf: "center",
        paddingBottom: 24,
    },
    input: {
        backgroundColor: "#F6F7FB",
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12,
    },
    form: {
        marginHorizontal: 30,
    },
    button: {
        backgroundColor: "#B8DCEA",
        height: 58,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 25,
    },
});
