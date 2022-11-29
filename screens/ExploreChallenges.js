import React, { useState, createContext, useContext, useEffect , useLayoutEffect} from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, Switch,ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import {database} from "../config/firebase";
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Sample from '../components/Sample';
import colors from '../colors';
import { getAuth } from "firebase/auth";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 



export default function ExploreChallenges() {
    const auth = getAuth();
    const user = auth.currentUser;

    const profileImageUrl = user.photoURL;
    const [products, setProducts] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const collectionRef = collection(database, 'exploreChallenges');
        const q = query(collectionRef, orderBy('name', 'desc'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
        console.log('querySnapshot unsusbscribe');
          setProducts(
            querySnapshot.docs.map(doc => ({
                name: doc.data().name,
                days: doc.data().days,
            }))
          );
        });
    
        navigation.setOptions({
            title: "Explore Challenges",
            headerTitleStyle: {
                fontSize: 30,
            },
            headerTitleAlign:'left',
            headerTintColor: "white",
            headerStyle: {
                backgroundColor: colors.darkGray,
                shadowRadius: 0,
                shadowOffset: {
                    height: 0,
                },
            },
            headerLeft: () => (
                // <FontAwesome name="bars" size={24} color="white" style={{marginLeft: 15}}/>
                null
            ),
            headerRight: () => (
                <Image
                    source={{ uri: profileImageUrl }}
                    style={{
                        width: 40,
                        height: 40,
                        marginRight: 15,
                        borderRadius: "50%"
                    }}
                />
            ),
        });
        return unsubscribe;
    }, []);


    return(
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{paddingBottom: 100}}>
            {/* <Text style={styles.title}>Sponsored </Text> */}
                {products.map(product => <Sample key={product.name} {...product} />)}
            </ScrollView>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkGray,
        //backgroundColor: white ,
        padding: 10,
        // paddingTop: 40,
        // boxSizing: "border-box"
    },
    row: {
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "center",
    },
    column: {
        flex: "0%",
    },
    toggle: {
        backgroundColor: '#B8DCEA',
        height: 71,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        width: 162,
        flexDirection: "row",
        margin: 10,
        paddingLeft: 5,
        paddingRight: 5,
    },
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
        borderRadius: "50%",
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
    subtitle: {
        paddingRight: 5,
        fontSize: 15,
        fontWeight: "400",
    },
    profileBar: {
        backgroundColor: "#A2C4D2",
        height: 42,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        // overflow: "hidden",
        flexDirection: "row",
        alignItems: "center"
    },
    profileBarProfiles: {
        width: 24,
        height: 24,
        marginLeft: 10,
        borderRadius: "50%"
    }
});