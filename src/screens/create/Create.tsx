import React, { useState } from "react";
import { auth, database } from "../../api/firebase";
import {
    DocumentReference,
    addDoc,
    collection,
    doc,
    updateDoc,
} from "firebase/firestore";
import {
    TextInput,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import DropDownPicker from "react-native-dropdown-picker";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CreateParamList } from "../../navigation/app-nav/CreateParamList";

interface CreateProps {
    navigation: StackNavigationProp<CreateParamList, "Create">;
    route: RouteProp<CreateParamList, "Create">;
}

const metricItems = [
    { label: "Minutes", value: "minutes" },
    { label: "Days", value: "days" },
    { label: "Miles", value: "miles" },
    { label: "Pounds", value: "pounds" },
    { label: "Custom", value: "custom" },
    { label: "Hours", value: "hours" },
];

const durationItems = [
    { label: "7", value: "7" },
    { label: "14", value: "14" },
    { label: "30", value: "30" },
    { label: "100", value: "100" },
];

export const Create: React.FC<CreateProps> = ({ navigation }) => {
    const user = auth.currentUser;

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [metric, setMetric] = useState("");
    const [customMetric, setCustomMetric] = useState("");
    const [duration, setDuration] = useState("");

    // Drop Down Picker open state
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);

    const onSend = async () => {
        const challengeObj = {
            name: title,
            description: desc,
            duration: parseInt(duration),
            metric: metric === "custom" ? customMetric : metric,
            friends: [user?.uid],
            custom: metric === "custom" ? true : false,
            createdAt: new Date(),
        };

        console.log(challengeObj);
        addDoc(collection(database, "userChallenges"), challengeObj).then(
            (docRef: DocumentReference) => {
                let challengeId = docRef.id;
                var shareCode = challengeId.slice(0, 6);
                updateDoc(doc(database, "userChallenges", challengeId), {
                    shareCode,
                });
                setTitle("");
                setDesc("");
                setMetric("");
                setCustomMetric("");
                setDuration("");
                navigation.navigate("Share", { code: shareCode });
            }
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.naming}>
                <Text style={styles.title}>Create New Challenge</Text>
                <TextInput
                    style={styles.titleInput}
                    onChangeText={(title) => setTitle(title)}
                    placeholder="| Challenge Title"
                    value={title}
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(desc) => setDesc(desc)}
                    placeholder="Enter description for this challenge"
                    value={desc}
                />
            </View>

            <View style={styles.section}>
                <View style={styles.iconTitle}>
                    <FontAwesome
                        style={styles.sectionIcon}
                        name="flag-o"
                        size={18}
                        color="white"
                    />
                    <Text style={styles.sectionTitle}>Select Goal Metric</Text>
                </View>
                <View>
                    <DropDownPicker
                        open={open1}
                        value={metric}
                        items={metricItems}
                        setOpen={setOpen1}
                        setValue={setMetric}
                        placeholder="Select Metric"
                        placeholderStyle={{ color: colors.placeholderGray }}
                        onOpen={() => setOpen2(false)}
                    />
                </View>
            </View>

            {metric === "custom" && (
                <View style={styles.section}>
                    <View style={styles.iconTitle}>
                        <FontAwesome
                            style={styles.sectionIcon}
                            name="flag-o"
                            size={18}
                            color="white"
                        />
                        <Text style={styles.sectionTitle}>
                            Custom Metric Name
                        </Text>
                    </View>

                    <View>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(text) => setCustomMetric(text)}
                            placeholder="custom metric"
                            autoCorrect={false}
                        />
                    </View>
                </View>
            )}

            <View style={{ zIndex: -5 }}>
                <View style={styles.section}>
                    <View style={styles.iconTitle}>
                        <MaterialCommunityIcons
                            style={styles.sectionIcon}
                            name="calendar-clock-outline"
                            color="white"
                            size={18}
                        />
                        <Text style={styles.sectionTitle}>Duration</Text>
                    </View>
                    <View>
                        <DropDownPicker
                            open={open2}
                            value={duration}
                            items={durationItems}
                            setOpen={setOpen2}
                            setValue={setDuration}
                            placeholder="Select Number of Days"
                            placeholderStyle={{ color: colors.placeholderGray }}
                        />
                    </View>
                </View>

                <View style={styles.beginChallengeButton}>
                    <TouchableOpacity onPress={onSend}>
                        <Text>Create Challenge</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkGray,
    },
    row: {
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "center",
    },
    naming: {
        backgroundColor: "white",
        height: 264,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        justifyContent: "flex-end",
        paddingLeft: 16,
        marginBottom: 21,
    },
    title: {
        fontSize: 24,
        fontWeight: "600",
    },
    titleInput: {
        marginTop: 24,
        fontSize: 20,
    },
    input: {
        marginTop: 24,
        marginBottom: 48,
    },
    section: {
        marginBottom: 11,
    },
    iconTitle: {
        display: "flex",
        flexDirection: "row",
        paddingLeft: 14,
        marginBottom: 6,
    },
    sectionTitle: {
        color: "white",
        fontSize: 18,
    },
    sectionIcon: {
        marginRight: 7,
    },

    textInput: {
        paddingHorizontal: 15,
        backgroundColor: "white",
        height: 46,
        borderRadius: 7,
        paddingLeft: 10,
    },

    clipboardContainer: {
        backgroundColor: "white",
        height: 46,
        borderRadius: 7,
        alignItems: "center",
        paddingLeft: 10,
        flexDirection: "row",
    },
    clipboardIcon: {},
    beginChallengeButton: {
        color: "black",
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 18,
        paddingBottom: 18,
        backgroundColor: "white",
        borderRadius: 999,
        marginRight: 60,
        marginLeft: 60,
        marginTop: 23,
    },
    btnTitle: {
        color: "black",
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 18,
        paddingBottom: 18,
    },
    btnStyle: {
        backgroundColor: "white",
        borderRadius: 999,
    },
    btnContainer: {
        marginRight: 60,
        marginLeft: 60,
        marginTop: 23,
    },

    beginChallengeText: {
        color: "black",
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center",
        paddingLeft: 10,
        paddingRight: 10,
    },
});
