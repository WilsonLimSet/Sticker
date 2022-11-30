import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import { auth, upload,useAuth } from "../config/firebase";
import { collection, doc, setDoc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, where, query, Firestore,  } from "firebase/firestore"; 
import { signOut } from 'firebase/auth';
import {database} from "../config/firebase";

import { useNavigation } from '@react-navigation/native';
import { useEffect} from "react";
import colors from '../colors';
import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword,updateProfile } from 'firebase/auth';


const backImage = require("../assets/backImage.jpg");

export default function EditProfile() {
  const authh = getAuth();
  const user = authh.currentUser;
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");
  const navigation = useNavigation();
  const [name, setName] = useState("");

  const onHandleChanges= async () => {
    await updateProfile(user,{
      displayName:name,
      //photoURL: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
    });
    await setDoc(doc(database, "users", user.uid), 
    { displayName:name})
    //,photoURL: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}) 
    await user.reload();
    // await user?.updateDisplayName("Jane Q. User");
    // await user?.updatePhotoURL("https://example.com/jane-q-user/profile.jpg");
    console.log('Document Added') 
  }     
  
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.form}>
      <Text style={{fontWeight: '500', alignSelf: "center", color: 'white', fontSize: 18, marginBottom: 10}}> Enter a new name </Text>
      <TextInput
          style={styles.input}
          placeholder="Enter a new name"
          autoCapitalize="none"
          keyboardType="name"
          textContentType="name"
          autoFocus={true}
          value={name}
          onChangeText={(text) => setName(text)}
        />
      <TouchableOpacity style={styles.button} onPress={onHandleChanges} >
        <Text style={{fontWeight: 'bold', color: 'black', fontSize: 18}}> Save Changes</Text>
      </TouchableOpacity>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkGray,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
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
  backImage: {
    width: "100%",
    height: 340,
    position: "absolute",
    top: 0,
    resizeMode: 'cover',
  },
  whiteSheet: {
    width: '100%',
    height: '75%',
    position: "absolute",
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: '#B8DCEA',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
});
