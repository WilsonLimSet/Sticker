import { getAuth } from "firebase/auth";
import React from "react";
import { View, ScrollView, Text, StyleSheet, Image } from "react-native";
import { colors } from "../styles/colors";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {  isValid,formatDistance, parseISO } from "date-fns";

interface FeedItemProps {
  photoUrl?: string;
  progressLog?: string;
  metricValue?: string;
  descriptionLog?: string;
  dateLog?: string;
}

export const FeedItem: React.FC<FeedItemProps> = ({
    photoUrl = "",
    metricValue = "",
    progressLog = "",
    descriptionLog = "",
    dateLog = "",
}) => {
    const authh = getAuth();
    const user = authh?.currentUser;
    const profileImageUrl = user?.photoURL;
    let realdateLog = "Invalid date format";
    if (isValid(parseISO(dateLog))) {
        realdateLog = formatDistance(parseISO(dateLog), new Date(), { addSuffix: true });
        console.log(realdateLog);
    } else {
        //console.error('Invalid date format');
    }


    return (
        <View style={styles.container}>
            <View style={styles.activityFeed}>
                <View style={styles.profileBar}>
                    <Image
                        source={{ uri: profileImageUrl }}
                        style={styles.profile}
                    />
                    <View>
                        <Text style={styles.text}>
                            {authh?.currentUser?.displayName} - {realdateLog}{" "}
                        </Text>
                        <Text style={{ color: "white", fontSize: 10 }}>
                            {progressLog ?? ""} {metricValue ?? ""} - {descriptionLog ?? ""}
                        </Text>
                    </View>
                    <MaterialCommunityIcons
                        style={styles.arrowIcon}
                        name="chevron-right"
                        color="white"
                        size={25}
                    />
                </View>
                <View style={styles.subContainer}>
                    <ScrollView horizontal={true} scrollEnabled={false}>
                        <View style={styles.imageContainer}>
                            <View style={styles.imgContainer}>
                                <Image
                                    source={{ uri: photoUrl }}
                                    style={styles.img}
                                />
                            </View>
                        </View>
                    </ScrollView>
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
    subContainer: {
        marginTop: "0.1%",
        paddingLeft: 0,
        alignItems: "center",
    },
    imageContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        paddingTop: 0.1,
        paddingBottom: 0.1,
        alignItems: "center",
        justifyContent: "center",
    },
    imgContainer: {
        width: "102%",
        aspectRatio: 1,
        margin: "0%",
    },
    img: {
        flex: 1,
        borderRadius: 10,
        width: "100%",
        height: undefined,
        aspectRatio: 1,
    },
    postSection: {
        marginBottom: 15,
    },
    postInfoSection: {
        width: 120,
        height: 230,
    },
    post: {
        display: "flex",
        flexDirection: "row",
        paddingLeft: 5,
        marginBottom: "1%",
    },
    sectionIcon: {
        marginRight: "0.5%",
    },
    arrowIcon: {
        marginRight: 5,
        marginLeft: "auto",
    },
    text: {
        color: "white",
        fontSize: 15,
        marginBottom: 3,
    },
    activityFeed: {
        marginTop: 10,
        flex: 1,
    },
    profile: {
        width: 28,
        height: 28,
        borderRadius: 50,
        marginRight: 10,
        marginLeft: 5
    },
    profileBar: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 25,
    },
    caption: {
        flexDirection: "row",
    },
    engagementButtons: {
        flexDirection: "row",
        marginTop: "auto",
    },
    imageContainer: {
        width: 390,
        height: 435,
        overflow: "hidden",
        borderRadius: 10,
        // flexBasis: "auto",
        // alignContent: "space-between",
    },
    emptyDiv: {
        height: 100,
    },
});
