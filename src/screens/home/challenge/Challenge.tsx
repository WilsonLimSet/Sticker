import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Text,
} from "react-native";
import { useDispatch } from "react-redux";
import { storage,database } from "../../../api/firebase";
import { colors } from "../../../styles/colors";
import { FeedItem } from "../../../ui/FeedItem";

interface ChallengeProps {}

export const Challenge: React.FC<ChallengeProps> = ({ navigation, route }) => {
    //console.log("PARAMS: ", route.params);
    const [challengeId, setChallengeId] = useState(null);
    const [photoUrls, setPhotoUrls] = useState([]);
    const [progressLog, setProgress] = useState([]);
    const [descriptionLog, setDescription] = useState([]);
    const [dateLog, setDate] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [metricValue, setMetricValue] = useState("");

    useEffect(() => {
        const { id } = route.params;
        console.log("ROUTE ID: ", id);
        const fetchChallenge = async () => {
            try {
                const challengeDocRef = doc(database, "userChallenges", id);
                const challengeDoc = await getDoc(challengeDocRef);
                if (challengeDoc.exists()) {
                    const metric = challengeDoc.data().metric;
                    setMetricValue(metric);
                    setChallengeId(id);
                    setPhotoUrls(challengeDoc.data().imageUrls);
                    setProgress(challengeDoc.data().progress);
                    setDescription(challengeDoc.data().description);
                    setDate(challengeDoc.data().date);
                    // console.log("Photo URLs: ", challengeDoc.data().imageUrls);
                    // console.log("Progress: ", challengeDoc.data().progress);
                    // console.log("Description: ", challengeDoc.data().description);
                    // console.log("Date: ", challengeDoc.data().date);
                   
                } else {
                    console.log("No challenge document found");
                }
            } catch (error) {
                console.log("Error fetching challenge:", error);
            } finally {
                setIsLoading(false);
             }
        };
        fetchChallenge();
    }, [route.params]);

    useEffect(() => {
        console.log("ProgressLog: ", progressLog);
    }, [progressLog]);
    

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Loading...</Text>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <ScrollView style={{ marginBottom: 1 }}>
                <TouchableOpacity
                    style={styles.logProgressButton}
                    onPress={() =>
                        navigation.navigate("LogProgress", { id: challengeId })
                    }
                    underlayColor="#fff"
                    sticky
                >
                    
                    <Text style={styles.logProgressText}>Log Progress</Text>
                </TouchableOpacity>
           
             {
  photoUrls && photoUrls.length > 0 ? (
    photoUrls
      .reverse()
      .map((photoUrl, index) => {
        const reversedIndex = photoUrls.length - 1 - index;
        return (
          <FeedItem
            key={index}
            photoUrl={photoUrl}
            metricValue={metricValue}
            progressLog={progressLog ? progressLog[reversedIndex] : undefined}
            descriptionLog={descriptionLog ? descriptionLog[reversedIndex] : undefined}
            dateLog={dateLog ? dateLog[reversedIndex] : undefined}
          />
        );
            })
        ) : (
            <View
            style={{
                alignItems: "center",
                justifyContent: "center",
                padding: 20,
            }}
            >
            <Text style={styles.text}>
                No photos available for this challenge.
            </Text>
            </View>
        )
        }


                <TouchableOpacity
                    style={styles.deleteChallengeButton}
                    onPress={() =>
                        navigation.navigate("DeleteChallenge", {
                            id: challengeId,
                        })
                    }
                    underlayColor="#fff"
                >
                    <Text style={styles.deleteChallengeText}>
                        Delete Challenge
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkGray,
        // paddingLeft: 18
    },
    imageContainer: {
        width: 235,
        height: 235,
        overflow: "hidden",
        borderRadius: 10,
        zIndex: 2, // add zIndex here
        backgroundColor: "white",
    },

    statSection: {
        display: "flex",
        flexDirection: "row",
        paddingLeft: 5,
        marginBottom: "1%",
    },
    sectionIcon: {
        marginRight: "3%",
    },
    title: {
        fontSize: 21,
        fontWeight: "600",
        color: "white",
        marginBottom: "3%",
    },
    text: {
        color: "white",
        fontSize: 15,
        marginBottom: 3,
    },
    leaderboard: {
        position: "relative",
        paddingLeft: 18,
    },
    leaderboardSectionHeader: {
        backgroundColor: "#70A1B7",
        width: 114,
        height: 32,
        borderRadius: 5,
        position: "absolute",
        top: 15,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 30,
    },
    leaderboardHeaderText: {
        fontSize: 16,
        fontWeight: "400",
        color: "white",
    },
    leaderboardSection: {
        backgroundColor: "#616f74",
        width: 335,
        height: 177,
        borderRadius: 10,
        zIndex: -5,
        marginTop: 30,
        justifyContent: "center",
        paddingLeft: 15,
    },
    leaderboardFirstPerson: {
        flexDirection: "row",
        alignItems: "center",
    },
    leaderboardPerson: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 12,
    },
    leaderboardPersonMetric: {
        flexDirection: "row",
        alignItems: "center",
    },
    progressBar: {
        width: 30,
        borderRadius: 2,
        backgroundColor: colors.primary,
        height: 6,
        marginRight: 6,
    },
    progressBar2: {
        width: 22,
        borderRadius: 2,
        backgroundColor: colors.primary,
        height: 6,
        marginRight: 6,
    },
    progressBar3: {
        width: 20,
        borderRadius: 2,
        backgroundColor: colors.primary,
        height: 6,
        marginRight: 6,
    },
    smallText: {
        fontSize: 10,
        color: "white",
    },
    activitySection: {
        marginTop: 16,
    },
    activitySectionTitle: {
        fontSize: 16,
        fontWeight: "500",
        color: "white",
        paddingLeft: 18,
    },
    subactivitySection: {
        alignItems: "center",
    },
    post: {
        marginTop: 10,
    },
    posterInfo: {
        flexDirection: "row",
        marginBottom: 8,
    },
    postImageContainer: {
        width: 253,
        height: 175,
        // when image is bigger than specified dimensions, it will be cutoff
        overflow: "hidden",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    posterIcon: {
        position: "absolute",
        left: -35,
    },
    postContentContainer: {
        position: "relative",
    },
    logProgressButton: {
        marginRight: "5%",
        marginLeft: "5%",
        paddingTop: 18,
        paddingBottom: 18,
        backgroundColor: "white",
        borderRadius: 10,
    },
    deleteChallengeButton: {
        marginRight: "5%",
        marginLeft: "5%",
        paddingTop: 18,
        paddingBottom: 18,
        backgroundColor: "white",
        borderRadius: 10,
    },
    deleteChallengeText: {
        color: "#605F5F",
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center",
        paddingLeft: 10,
        paddingRight: 10,
    },
    logProgressText: {
        color: "#605F5F",
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center",
        paddingLeft: 10,
        paddingRight: 10,
    },
});
