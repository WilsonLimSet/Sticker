import React, { useEffect } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import colors from '../colors';
const catImageUrl = "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d";

const Home = () => {

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            title: "Dashboard",
            headerTitleStyle: {
                fontSize: 30,
            },
            headerTitleAlign:'left',
            headerTintColor: "white",
            headerStyle: {
                backgroundColor: colors.darkGray,
                // fontSize: 1000,
                shadowRadius: 0,
                shadowOffset: {
                    height: 0,
                },
            },
            headerLeft: () => (
                <FontAwesome name="bars" size={24} color="white" style={{marginLeft: 15}}/>
            ),
            headerRight: () => (
                <Image
                    source={{ uri: catImageUrl }}
                    style={{
                        width: 40,
                        height: 40,
                        marginRight: 15,
                    }}
                />
            ),
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.column}>
                    <View style={styles.toggle}>
                        <Text style={styles.subtitle}>Show active Challenges</Text>
                        <FontAwesomeIcon icon="circle-chevron-down" size="23x" color={colors.darkGray}/>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('View Challenge')}>
                        <View style={styles.entry}>
                            <View style={styles.footer}>
                                <Text style={styles.title}>Cycling</Text>
                                <View style={styles.profileBar}>
                                    {/* circle profile bar */}
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('View Challenge')}>
                        <View style={styles.entry}>
                            <View style={styles.footer}>
                                <Text style={styles.title}>Walking</Text>
                                <View style={styles.profileBar}>
                                    {/* circle profile bar */}
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.column}>
                    <TouchableOpacity onPress={() => navigation.navigate('View Challenge')}>
                        <View style={styles.entry}>
                            <View style={styles.footer}>
                                    <Text style={styles.title}>Running</Text>
                                <View style={styles.profileBar}>
                                    {/* circle profile bar */}
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('View Challenge')}>
                        <View style={styles.entry}>
                            <View style={styles.footer}>
                                <Text style={styles.title}>Drinking Water</Text>
                                <View style={styles.profileBar}>
                                    {/* circle profile bar */}
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            
            {/* <TouchableOpacity
                onPress={() => navigation.navigate("Chat")}
                style={styles.chatButton}
            >
                <Entypo name="chat" size={24} color={colors.lightGray} />
            </TouchableOpacity> */}
        </View>
    );
    };

    export default Home;

    const styles = StyleSheet.create({
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
        column: {
            flex: "0%",
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
        },
        entry: {
            backgroundColor: colors.primary,
            width: 162,
            height: 235,
            borderRadius: 25,
            margin: 10,
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
            paddingRight: 10,
            fontSize: 16,
            fontWeight: "400",
        },
        profileBar: {
            backgroundColor: "#A2C4D2",
            height: 42,
            borderBottomRightRadius: 25,
            borderBottomLeftRadius: 25,
            overflow: "hidden",
        },
        chatButton: {
            backgroundColor: colors.primary,
            height: 50,
            width: 50,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: colors.primary,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: .9,
            shadowRadius: 8,
            marginRight: 20,
            marginBottom: 50,
        }
    });