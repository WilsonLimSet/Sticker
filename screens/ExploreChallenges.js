import * as React from 'react';
import * as RN from 'react-native';
import {  View, Text, Image,FlatList, Pressable, ScrollView, StyleSheet, Dimensions } from "react-native";
import { Svg, Path } from "react-native-svg";
import colors from '../colors';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import {useState,useEffect} from "react"
import { database } from "../config/firebase";
import { doc } from "firebase/firestore";

export default function ExploreChallenges({ navigation }) {

  // const [users,setUsers] = useState([]);
  // const exploreRef = collection(database,'exploreChallenges');
  

  // useEffect( () => {
  //   exploreRef
  //   .onSnapshot(
  //     querySnapshot => {
  //       const users = []
  //       querySnapshot.forEach((doc) => {
  //         const { Days,Name} =doc.data()
  //         users.push({
  //           id:doc.id, Days, Name,
  //         })
  //       })
  //       setUsers(users)
  //     }
  //   )
  // })

  // const [user,SetUser] = useState(null);
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
  // const [products, setProducts] = React.useState([]);

  // React.useLayoutEffect(() => {
  //     navigation.setOptions({
  //         headerRight: () => <RN.Button title='Add' onPress={() => navigation.navigate('Add')} />
  //     })
  // },[navigation])

  // React.useEffect(() => {
  //     const collectionRef = collection(database, 'products');
  //     const q = query(collectionRef, orderBy('createdAt', 'desc'));

  // const unsubscribe = onSnapshot(q, querySnapshot => {
  //     console.log('querySnapshot unsusbscribe');
  //       setProducts(
  //         querySnapshot.docs.map(doc => ({ 
  //             days: doc.data().days,
  //             name: doc.data().name,
  //         }))
  //       );
  //     });
  // return unsubscribe;
  // },[])


  
  return (
    // <View style={stylesheet.container}>
    //   <FlatList
    //     style = {{height: '100'}}
    //     //data = {users}
    //     numColumns = {1}
    //     renderItem = {({item}) =>(
    //       <Pressable
    //         style ={stylesheet.container}
    //       >
    //         <View style={stylesheet.innerContainer}>
    //           <Text style={stylesheet.days}></Text>
              <Text style={stylesheet.name}> Hello </Text>
    //         </View>


    //       </Pressable>
    //   )}
    //   />
		
			
	
    // </View>
	);
}

const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.darkGray,
  },
  innerContainer: {
    alignItems: "center",
    flexDirection: "column",
  },
  days: {
    fontWeight: "bold",
  },
  name:{
    fontWeight: "300",
  }
	
	
});