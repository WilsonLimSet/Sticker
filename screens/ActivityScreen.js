import { useNavigation } from '@react-navigation/native';
import { React, useState, useCallback } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as Clipboard from 'expo-clipboard';
import colors from '../colors';
import { FontAwesome } from '@expo/vector-icons';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function ActivityScreen() {
    return (
        <View style={styles.container}>
         
            <View style={styles.statsSection}>
                <Text style={styles.title}>Activity Feed</Text>
                <View style={styles.statSection}>
                    <FontAwesome style={styles.sectionIcon} name="flag-o" size={18} color="white"/>
                    <Text style={styles.text}>Miles</Text>
                </View>
                <View style={styles.statSection}>
                    <MaterialCommunityIcons style={styles.sectionIcon} name="calendar-clock-outline" color="white" size={18}/>
                    <Text style={styles.text}>Nov 25 - Dec 17 {"(22 days)"}</Text>
                </View>
                <View style={styles.statSection}>
                    <MaterialCommunityIcons style={styles.sectionIcon} name="account-group-outline" color="white" size={18}/>
                    <Text style={styles.text}>3 joined</Text>
                </View>
            </View>
            <View style={styles.leaderboard}>
                <View style={styles.leaderboardSectionHeader}>
                    <Text style={styles.leaderboardHeaderText}>Leaderboard</Text>
                </View>
                <View style={styles.leaderboardSection}>
                    <View style={styles.leaderboardSectionContainer}>
                        <View style={styles.leaderboardFirstPerson}>
                            {/* <Image></Image> */}
                            <MaterialCommunityIcons style={styles.sectionIcon} name="account-group-outline" color="white" size={18}/>
                            <View>
                                <Text style={styles.text}>1. Xinyue Ma</Text>
                                <View style={styles.leaderboardPersonMetric}>
                                    <View style={styles.progressBar}></View>
                                    <Text style={styles.smallText}>57.7 miles</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.leaderboardPerson}>
                            {/* <Image></Image> */}
                            <MaterialCommunityIcons style={styles.sectionIcon} name="account-group-outline" color="white" size={18}/>
                            <View>
                                <Text style={styles.text}>2. Sophia Park</Text>
                                <View style={styles.leaderboardPersonMetric}>
                                    <View style={styles.progressBar2}></View>
                                    <Text style={styles.smallText}>45.6 miles</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.leaderboardPerson}>
                            {/* <Image></Image> */}
                            <MaterialCommunityIcons style={styles.sectionIcon} name="account-group-outline" color="white" size={18}/>
                            <View>
                                <Text style={styles.text}>3. Wilson Lim</Text>
                                <View style={styles.leaderboardPersonMetric}>
                                    <View style={styles.progressBar3}></View>
                                    <Text style={styles.smallText}>43.6 miles</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.activitySection}>
                <Text style={styles.activitySectionTitle}>Activity Log</Text>
                <View style={styles.subactivitySection}>
                    <View style={styles.post}>
                        <MaterialCommunityIcons style={styles.posterIcon} name="account-group-outline" color="white" size={18}/>
                        <View style={styles.postContentContainer}>
                            <View style={styles.posterInfo}>
                                <Text style={styles.smallText}>1. Xinyue Ma | </Text>
                                <Text style={styles.smallText}>11/12/22 3:32 pm</Text>
                            </View>
                            <View style={styles.postImageContainer}>
                                {/* IMG HERE */}
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            {/* LOG PROGRESS BUTTON HERE */}
            <TouchableOpacity
                style={styles.logProgressButton}
                onPress={() => navigation.navigate('Home')}
                underlayColor='#fff'>
                <Text style={styles.logProgressText}>Log Progress</Text>
            </TouchableOpacity>
        </View>
    );
  }



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkGray,
        // paddingLeft: 18
    },
    statsSection: {
        marginTop: "5%",
        paddingLeft: 18
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
        paddingLeft: 18
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
        color: "white"
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
    leaderboardSectionContainer: {
        
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
        color: "white"
    },
    activitySection: {
        marginTop: 16,
    },
    activitySectionTitle: {
        fontSize: 16,
        fontWeight:"500",
        color: "white",
        paddingLeft: 18
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
        backgroundColor: colors.primary,

        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    posterIcon: {
        position: 'absolute',
        left: -35,
    },
    postContentContainer: {
        position: "relative"
    },
    logProgressButton:{
      marginRight:"5%",
      marginLeft:"5%",
      paddingTop:18,
      paddingBottom:18,
      backgroundColor:'white',
      borderRadius:10,
    },
    logProgressText:{
        color:'#605F5F',
        fontSize: 18,
        fontWeight: "500",
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10
    }
});