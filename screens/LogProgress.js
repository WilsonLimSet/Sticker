
import { useNavigation, useRoute } from '@react-navigation/native';
import { React, useState, useCallback, useEffect} from 'react'
import { View, Text, StyleSheet, TextInput ,Alert} from 'react-native';
import colors from '../colors';
import { FontAwesome } from '@expo/vector-icons';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { storage, database } from "../config/firebase";
import firebase from "../config/firebase";
import { doc, getDoc,deleteDoc } from 'firebase/firestore'; 
import { useDispatch ,useSelector} from "react-redux";
import { setProgress,setDescription,setChallengeId,setDate} from "./challengeSlice"

export default function LogProgress() {
  const route = useRoute(); // add this line to get route object
  const navigation = useNavigation();
  const [progresss, setProgresss] = useState("");
  const [datee, setDatee] = useState("");
  const [descriptionn, setDescriptionn] = useState("");
  const [metricValue, setMetricValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const dispatch = useDispatch();
  const challengeId = useSelector((state) => state.challenge.challengeId);
  
    const handleLogProgress = useCallback((progresss, descriptionn,datee) => {
    if (progresss !== "" && descriptionn !== "") {

        dispatch(setProgress(progresss));
        dispatch(setDescription(descriptionn));
        dispatch(setDate(new Date().toISOString())); // <-- Fix here
        console.log(progresss);
        console.log(descriptionn);
        console.log(datee);
        navigation.navigate('Take Photo');
    } else {
        Alert.alert( "Please fill out both progress and description fields.");
    }
    }, []);


  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const challengeDocRef = doc(database, 'userChallenges', challengeId);
        const challengeDoc = await getDoc(challengeDocRef);
        if (challengeDoc.exists()) {
          const metric = challengeDoc.data().metric;
          setMetricValue(metric);
          console.log(metric);
        } else {
          console.log('No challenge document found');
        }
      } catch (error) {
        console.log('Error fetching challenge:', error);
      }
    };
    fetchChallenge();
  }, [challengeId]);

  return (
    <View style={styles.container}>
        <View style={styles.statsSection}>
            <Text style={styles.title}>Log Progress</Text>
            
        </View>
        <Text style={{fontWeight: '500', alignSelf: "center", color: 'white', fontSize: 18, marginBottom: 10}}> Enter your progress in terms of  {metricValue} </Text>
        <TextInput
    style={[styles.input,{ width: 150, height: 50 }]}
    placeholder="Enter your progress"
    autoCapitalize="none"
    keyboardType="numeric"
    textContentType="name"
    autoFocus={true}
    value={progresss}
    onChangeText={(text) => {setProgresss(text);}}
/>
{errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

<Text style={{fontWeight: '500', alignSelf: "center", color: 'white', fontSize: 18, marginBottom: 10}}> Enter a description </Text>
      <TextInput
          style={styles.input}
          placeholder="Description"
          autoCapitalize="none"
          keyboardType="name"
          textContentType="name"
          autoFocus={true}
          value={descriptionn}
          onChangeText={(text) => setDescriptionn(text)}
        />
      
      
      <TouchableOpacity
        style={styles.logProgressButton}
        onPress={useCallback(() => handleLogProgress(progresss, descriptionn,datee), [progresss, descriptionn,datee])}

        underlayColor='#fff'
      >
        <Text style={styles.logProgressText}>Take a photo to log it!</Text>
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
input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
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
  