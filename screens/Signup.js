import React, { useState } from 'react';
import { collection, doc, setDoc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, where, query, Firestore,  } from "firebase/firestore"; 
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import { createUserWithEmailAndPassword,updateProfile } from 'firebase/auth';
import { auth } from '../config/firebase';
import {database} from '../config/firebase';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
const backImage = require("../assets/backImage.jpg");
import colors from '../colors';

export default function Signup({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const onHandleSignup = async () => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(user,{
      displayName:email.split('@')[0].split('.')[0] ,
      photoURL: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
    });
    await setDoc(doc(database, "users", user.uid), 
    { displayName:email.split('@')[0].split('.')[0] 
    ,email: user.email
    ,photoURL: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}) 
    await user.reload();
    // await user?.updateDisplayName("Jane Q. User");
    // await user?.updatePhotoURL("https://example.com/jane-q-user/profile.jpg");
    console.log('Document Added') 
  }     

  
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={require('../assets/sticker-logo.png')} style={styles.backImage} />
        <Text style={{fontSize: 20, fontWeight: "400", marginBottom: 15, color: "white"}}>Welcome to Sticker</Text>
      </View>
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Sign Up</Text>
         <TextInput
        style={styles.input}
        placeholder="Enter email"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoFocus={true}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        textContentType="password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={onHandleSignup}>
        <Text style={{fontWeight: 'bold', color: 'black', fontSize: 18}}> Sign Up</Text>
      </TouchableOpacity>
      <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
        <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{color: '#B8DCEA', fontWeight: '600', fontSize: 14}}> Log In</Text>
        </TouchableOpacity>
      </View>
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
  imgContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: "white",
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
    marginTop: 40,
  },
});