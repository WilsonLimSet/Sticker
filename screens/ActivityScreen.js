import { useNavigation } from '@react-navigation/native';
import { React, useState, useCallback, useLayoutEffect } from 'react'
import { View, Text, StyleSheet, TextInput, Image, Pressable } from 'react-native';
import colors from '../colors';
import { FontAwesome } from '@expo/vector-icons';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import { getAuth } from "firebase/auth";

export default function ActivityScreen() {
    const auth = getAuth();
    const user = auth.currentUser;
    const profileImageUrl = user.photoURL;
    const navigation = useNavigation();
    const [liked, setLiked] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Dashboard",
            headerTitleStyle: {
                fontSize: 30,
            },
            headerTitleAlign:'left',
            headerTintColor: "white",
            headerStyle: {
                backgroundColor: colors.lightGray,
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
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>Activity</Text>
                    <Image source={{ uri: profileImageUrl }} style={styles.topProfile}/>
                </View>
                <View style={styles.activityFeed}>
                    <View style={styles.postSection}>
                        <View style={styles.profileBar}>
                            <Image source={{ uri: profileImageUrl }} style={styles.profile}/>
                            <View>
                                <Text style={styles.text}>Sarah Liang</Text>
                                <Text style={{color: "white", fontSize: 10}}>Today 3:53</Text>
                            </View>
                            <MaterialCommunityIcons style={styles.arrowIcon} name="chevron-right" color="white" size={25}/>
                        </View>
                        <View style={styles.post}>
                            <View style={styles.column}>
                                <View style={styles.postInfoSection}>
                                    <View style={styles.caption}>
                                        <FontAwesome style={styles.sectionIcon} name="flag-o" size={18} color="white"/>
                                        <Text style={styles.text}>2 hours of coding!!!</Text>
                                    </View>
                                    <View style={styles.engagementButtons}>
                                        {/* heart, comments */}
                                        <Pressable onPress={() => setLiked((isLiked) => !isLiked)}>
                                            <MaterialCommunityIcons
                                                name={liked ? "heart" : "heart-outline"}
                                                size={26}
                                                color={liked ? "#EB5050" : "white"}
                                            />
                                            <Text style={{color: "white", fontSize: 13}}>Comment...</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.column}>
                                <View style={styles.imageContainer}>
                                    <Image style={styles.img} source={require('../assets/randomGirl.png')} />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.postSection}>
                        <View style={styles.profileBar}>
                            <Image source={{ uri: profileImageUrl }} style={styles.profile}/>
                            <View>
                                <Text style={styles.text}>Wilson Lim Setiawan</Text>
                                <Text style={{color: "white", fontSize: 10}}>Yesterday 2:03pm</Text>
                            </View>
                            <MaterialCommunityIcons style={styles.arrowIcon} name="chevron-right" color="white" size={25}/>
                        </View>
                        <View style={styles.post}>
                            <View style={styles.column}>
                                <View style={styles.postInfoSection}>
                                    <View style={styles.caption}>
                                        <FontAwesome style={styles.sectionIcon} name="flag-o" size={18} color="white"/>
                                        <Text style={styles.text}>34 pgs read</Text>
                                    </View>
                                    <View style={styles.engagementButtons}>
                                        {/* heart, comments */}
                                        <Pressable onPress={() => setLiked((isLiked) => !isLiked)}>
                                            <MaterialCommunityIcons
                                                name={liked ? "heart" : "heart-outline"}
                                                size={26}
                                                color={liked ? "#EB5050" : "white"}
                                            />
                                            <Text style={{color: "white", fontSize: 13}}>Comment...</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.column}>
                                <View style={styles.imageContainer}>
                                    <Image style={styles.img} source={require('../assets/randomGirl.png')} />
                                </View>
                            </View>
                        </View>
                    </View>
                    
                    
                </View>
            </View>
        </View>
    );
  }



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkGray,
        paddingTop: 30,
    },
    subContainer: {
        marginTop: "5%",
        paddingLeft: 18
    },
    postSection: {
        marginBottom: 15,
    },
    postInfoSection: {
        // flexBasis: 100,
        // alignContent: "space-between",
        width: 120,
        height: 230,
    },
    post: {
        display: "flex",
        flexDirection: "row",
        paddingLeft: 5,
        marginBottom: "1%",
    },
    sectionIcon: {
        marginRight: "4.5%",
    },
    arrowIcon: {
        marginRight: 25,
        marginLeft: "auto"
    },
    header: {
        flexDirection: "row"
    },
    title: {
        fontSize: 21,
        fontWeight: "600",
        color: "white",
        marginBottom: "3%",
    },
    text: {
        color: "white",
        fontSize: 15,
        marginBottom: 3,
    },
    activityFeed: {
        marginTop: 15
    },
    topProfile: {
        width: 24,
        height: 24,
        marginLeft: 10,
        borderRadius: "50%",
        marginLeft: "auto",
        marginRight: 30
    },
    profile: {
        width: 28,
        height: 28,
        borderRadius: "50%",
        marginRight: 10,
    },
    profileBar: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 25
    },
    caption: {
        flexDirection: "row",
    },
    engagementButtons: {
        flexDirection: "row",
        marginTop: "auto"
    },
    imageContainer: {
        width: 235,
        height: 235,
        overflow: "hidden",
        borderRadius: 10,
        // flexBasis: "auto",
        // alignContent: "space-between",
    },
    img: {
        borderRadius: 10,
    }
});