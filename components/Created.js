import React, { useEffect, useState, useLayoutEffect } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet, Switch,ScrollView  } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import colors from '../colors';
import {database} from "../config/firebase";
import Sample from '../components/Sample';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

export default function Created({
    id,
    name,   
}) {
    const auth = getAuth();
    const user = auth.currentUser;
    const profileImageUrl = user.photoURL;
    const navigation = useNavigation();
    return(
        <View>
        <TouchableOpacity onPress={() => navigation.navigate('View Challenge')}>
        <View style={styles.entry}>
            <View style={styles.aboveFooter}>
                <View style={styles.circle}></View>
                <Image source={require('../assets/star-logo-simplified.png')} />
            </View>
            <View style={styles.footer}>
                <Text style={styles.title}>{name}</Text>
                <View style={styles.profileBar}>
                <Image source={{ uri: profileImageUrl }} style={styles.profileBarProfiles}/>
                <Image source={{ uri: profileImageUrl }} style={styles.profileBarProfiles}/>
                </View>
            </View>
         </View>
        </TouchableOpacity>
        </View>
        )
    }
const styles = StyleSheet.create({
    productContainer: {
        padding: 16,
        backgroundColor: '#B8DCEA',
        margin: 16,
        borderRadius: 8,
    },
    container: {
        flex: 1,
        backgroundColor: colors.darkGray,
        padding: 10,
        // paddingTop: 40,
        // boxSizing: "border-box"
    },
    row: {
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "center",
    },
    toggle: {
        backgroundColor: colors.lightGray,
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
        borderRadius: 50
    }
});