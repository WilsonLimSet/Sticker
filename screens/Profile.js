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
import colors from '../colors';

export default function Profile() {
  // const [user,SetUser] = useState(null);
  const sendDataToFirestore = async() => {
    const uid = auth.currentUser?.uid;
    const docRef = doc(database, "user", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document Data", docSnap.data());
      SetUser.doc.data()
    }
    else{
      console.log("Document Data Not Exist");
    }
  }
  const authh = getAuth();
  const user = authh.currentUser;

  const profileImageUrl = user.photoURL;

  const navigation = useNavigation();
  const onSignOut = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  };

  useEffect(() => {
    navigation.setOptions({
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: "600",
        },
        headerTintColor: "white",
        headerStyle: {
            backgroundColor: colors.darkGray,
            shadowRadius: 0,
            shadowOffset: {
                height: 0,
            },
        },
    });
}, [navigation]);
  
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>  
        <View style={styles.userImgContainer}>
          <Image source={{ uri: profileImageUrl }} style={styles.userImg} />
        </View>
        <SafeAreaView style={styles.form}>
          <Text style={{fontWeight: 'bold', alignSelf: "center", color: 'white', fontSize: 18, marginTop: 23}}> Welcome {auth?.currentUser?.displayName} </Text>
          <TouchableOpacity style={styles.button} onPress={onSignOut}>
            <Text style={{fontWeight: 'bold', color: 'black', fontSize: 18}}>Log Out</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate("EditProfile")}>
            <Text style={{fontWeight: 'bold', color: "black", fontSize: 18}}>Edit Profile</Text>
          </TouchableOpacity>
        </SafeAreaView>
        <StatusBar barStyle="light-content" />
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
    height: 600,
    justifyContent: "center",
  },
  userImgContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
    overflow: "hidden",
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
  form: {
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
