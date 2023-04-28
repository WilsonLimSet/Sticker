import { getAuth } from 'firebase/auth';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { database } from "../../api/firebase";
import { doc, getDoc } from "firebase/firestore";


interface CreatedProps {
  id: string;
  name: string;
  friends: string[]; // array of friend IDs
  handleNavigation: (id: string) => void;
}

export const Created: React.FC<CreatedProps> = ({ id, name, friends, handleNavigation }) => {
    const auth = getAuth();
    const storage = getStorage();
  
    const [profileImageUrls, setProfileImageUrls] = useState<string[]>([]);
  
    useEffect(() => {
      const fetchFriendPics = async () => {
        try {
          const challengeDocRef = doc(database, "userChallenges", id);
          const challengeDoc = await getDoc(challengeDocRef);
          if (challengeDoc.exists()) {
            const friendsList = challengeDoc.data().friends;
            const imageUrls: string[] = [];
            for (const friendId of friendsList) {
              const friendProfileRef = ref(storage, `profilepics/${friendId}`);
              try {
                const downloadURL = await getDownloadURL(friendProfileRef);
                imageUrls.push(downloadURL);
              } catch (error) {
                console.log(`Could not load profile image for friend with ID ${friendId}:`, error);
              }
            }
            setProfileImageUrls(imageUrls);
            console.log("Friends ", friendsList);
          } else {
            console.log("No challenge document found");
          }
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchFriendPics();
    }, []);
  

    return (
        <TouchableOpacity onPress={() => handleNavigation(id)}>
            <View style={styles.entry}>
                <View style={styles.aboveFooter}>
                    <View style={styles.circle}></View>
                        <Image source={require('./../../../assets/star-logo-simplified.png')} />
                    </View>
                    <View style={styles.footer}>
                        <Text style={styles.title}>{name}</Text>
                        <View style={styles.profileBar}>
      {profileImageUrls.map((url, index) => (
        <Image source={{ uri: url }} style={styles.profileBarProfiles} key={index} />
      ))}
    </View>
                    </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    entry: {
        backgroundColor: colors.primary,
        width: 162,
        height: 235,
        borderRadius: 25,
        margin: 10,
    },
    aboveFooter: {
        alignItems: 'center',
        height: "80%",
        justifyContent: "center",
    },
    circle: {
        width: 100,
        height: 100,
        borderWidth: 6,
        borderColor: "#c0e1ef",
        borderRadius: 50,
        position: "absolute",
    },
    footer: {
        flex: 1,
        justifyContent: "flex-end",
    },
    title: {
        paddingLeft: 13,
        marginBottom: 5,
        fontSize: 20,
        fontWeight: "400",
    },
    profileBar: {
        backgroundColor: "#A2C4D2",
        height: 42,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        flexDirection: "row",
        alignItems: "center"
    },
    profileBarProfiles: {
        width: 24,
        height: 24,
        marginLeft: 10,
        borderRadius: 50
    }
});