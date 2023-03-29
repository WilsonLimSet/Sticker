import { useNavigation, useRoute } from '@react-navigation/native';
import { React, useState, useCallback, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as Clipboard from 'expo-clipboard';
import colors from '../colors';
import { FontAwesome } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { doc, getDoc,deleteDoc} from 'firebase/firestore';
import { database } from '../config/firebase';

export default function DeleteChallenge() {
  const [challengeId, setChallengeId] = useState(null);
  const navigation = useNavigation();
  const route = useRoute(); // add this line to get route object

  useEffect(() => {
    const { id } = route.params;
    console.log(id);
    setChallengeId(id);
  }, []);

  const handleDelete = async () => {
    try {
      const challengeDocRef = doc(database, 'userChallenges', challengeId);
      await deleteDoc(challengeDocRef);
      navigation.navigate('Home');
    } catch (error) {
      console.log('Error deleting challenge:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.deleteChallengeButton}
        onPress={handleDelete}
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
  },
  deleteChallengeButton: {
    marginRight: "5%",
    marginLeft: "5%",
    paddingTop: 18,
    paddingBottom: 18,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  deleteChallengeText: {
    color: '#605F5F',
    fontSize: 18,
    fontWeight: "500",
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10
  }
});
