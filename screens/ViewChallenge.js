import { useNavigation, useRoute } from '@react-navigation/native';
import { React, useState, useCallback, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as Clipboard from 'expo-clipboard';
import colors from '../colors';
import { FontAwesome } from '@expo/vector-icons';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { doc, getDoc,deleteDoc } from 'firebase/firestore';
import { database } from '../config/firebase';

export default function ViewChallenge({ route }) {
  const [challengeId, setChallengeId] = useState(null);
  const navigation = useNavigation(); // add this line to get navigation object

  useEffect(() => {
    const { id } = route.params;
    console.log(id);
    const fetchChallenge = async () => {
      try {
        const challengeDocRef = doc(database, 'userChallenges', id);
        const challengeDoc = await getDoc(challengeDocRef);
        if (challengeDoc.exists()) {
          setChallengeId(id);
          
        } else {
          console.log('No challenge document found');
        }
      } catch (error) {
        console.log('Error fetching challenge:', error);
      }
    };
    fetchChallenge();
  }, []);


  return (
    <View style={styles.container}>
      <TouchableOpacity
                style={styles.logProgressButton}
                onPress={() => navigation.navigate('Log Progress')}
                underlayColor='#fff'>
                <Text style={styles.logProgressText}>Log Progress</Text>
            </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteChallengeButton}
        
        onPress={() => navigation.navigate('Delete Challenge', { id:challengeId })}
        underlayColor='#fff'>
            
        <Text style={styles.deleteChallengeText}>Delete Challenge</Text>
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
    deleteChallengeButton:{
        marginRight:"5%",
        marginLeft:"5%",
        paddingTop:18,
        paddingBottom:18,
        backgroundColor:'white',
        borderRadius:10,
      },
      deleteChallengeText:{
        color:'#605F5F',
        fontSize: 18,
        fontWeight: "500",
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10
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