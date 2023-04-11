import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { database } from "../config/firebase";
import colors from '../colors';
import { getAuth } from "firebase/auth";
import { formatDistance, parseISO } from 'date-fns';

export default function FeedComponent({ photoUrl,progressLog,metricValue ,descriptionLog,dateLog}) {
  const authh = getAuth();
  const user = authh.currentUser;
  const profileImageUrl = user.photoURL;
  const realdateLog = formatDistance(parseISO(dateLog), new Date(), { addSuffix: true });

  return (
    <View style={styles.container}>
      <View style={styles.activityFeed}>
        <View style={styles.profileBar}>
          <Image source={{ uri: profileImageUrl }} style={styles.profile} />
          <View>
            <Text style={styles.text}>{authh?.currentUser?.displayName} - {realdateLog} </Text>
            <Text style={{ color: "white", fontSize: 10 }}>{progressLog} {metricValue} - {descriptionLog}</Text>
          </View>
          <MaterialCommunityIcons style={styles.arrowIcon} name="chevron-right" color="white" size={25} />
        </View>
        <View style={styles.subContainer}>
          <ScrollView horizontal={true}>
            <View style={styles.imageContainer}>
                <View style={styles.imgContainer}>
                  <Image source={{ uri: photoUrl }} style={styles.img} />
                </View>
           
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.darkGray,
    },
    subContainer: {
      marginTop: "5%",
      paddingLeft: 18,
      alignItems: 'center'
    },
    imageContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingTop: 10,
      paddingBottom: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    imgContainer: {
      width: '102%',
      aspectRatio: 1,
      margin: '0%',
    },
    img: {
      flex: 1,
      borderRadius: 10,
      width: '100%',
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
      marginRight: "4.5%",
    },
    arrowIcon: {
      marginRight: 25,
      marginLeft: "auto"
    },
    text: {
      color: "white",
      fontSize: 15,
      marginBottom: 3,
    },
    activityFeed: {
      marginTop: 15,
      flex: 1
    },
    profile: {
      width: 28,
      height: 28,
      borderRadius: 50,
      marginRight: 10,
    },
    profileBar: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 25
    },
caption: {
    flexDirection: "row",
},
engagementButtons: {
    flexDirection: "row",
    marginTop: "auto"
},
imageContainer: {
    width: 235,
    height: 235,
    overflow: "hidden",
    borderRadius: 10,
    // flexBasis: "auto",
    // alignContent: "space-between",
},
emptyDiv: {
    height: 100
}
});
