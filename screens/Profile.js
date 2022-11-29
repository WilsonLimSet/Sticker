//import React, { useContext, useState } from "react";
import React,{useRef,useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import { auth } from "../config/firebase";
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { UserInterfaceIdiom } from "expo-constants";
import "firebase/auth";
import { getAuth } from "firebase/auth";
import {database} from "../config/firebase";
const backImage = require("../assets/backImage.jpg");
import firebase from "../config/firebase";
import { doc, getDoc, getFirestore, setDoc, collection} from "firebase/firestore";


export default function Profile() {
  // // const [user,SetUser] = useState(null);
  // const sendDataToFirestore = async() => {
  //   const uid = auth.currentUser?.uid;
  //   const docRef = doc(database, "user", uid);
  //   const docSnap = await getDoc(docRef);
  //   if (docSnap.exists()) {
  //     console.log("Document Data", docSnap.data());
  //     SetUser.doc.data()
  //   }
  //   else{
  //     console.log("Document Data Not Exist");
  //   }
  // }
  const auth = getAuth();
  const user = auth.currentUser;
  console.log(user);
  console.log(user.photoURL);

  const profileImageUrl = user.photoURL;

  const navigation = useNavigation();
  const onSignOut = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  };
  
  return (
    <View style={styles.container}>
      <Image source={{ uri: profileImageUrl }} style={styles.userImg} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={{fontWeight: 'bold', alignSelf: "center", color: '#B8DCEA', fontSize: 18}}> Welcome {auth?.currentUser?.displayName} </Text>
      <TouchableOpacity style={styles.button} onPress={onSignOut}>
        <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}> Log Out</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate("EditProfile")}>
        <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}> Edit Profile</Text>
      </TouchableOpacity>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
    overflow: "hidden",
    borderWidth: 1,
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
    marginTop: 40,
  },
});
