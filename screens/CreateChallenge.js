import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useState, useCallback } from 'react'
import { collection, addDoc } from 'firebase/firestore';
import {database} from '../config/firebase';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as Clipboard from 'expo-clipboard';
import colors from '../colors';
import { FontAwesome } from '@expo/vector-icons';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function CreateChallenge({ navigation }) {
    const [title, onChangeTitle] = useState(null);
    const [text, onChangeText] = useState(null);
    
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'Minutes', value: 'minutes'},
      {label: 'Days', value: 'days'},
      {label: 'Miles', value: 'miles'},
      {label: 'Pounds', value: 'pounds'},
      {label: 'Custom', value: 'custom'},
      {label: 'Hours', value: 'hours'},
    ]);

    const [openDuration, setDurationOpen] = useState(false);
    const [valueDuration, setDurationValue] = useState(null);
    const [itemsDuration, setDurationItems] = useState([
      {label: '7', value: '7'},
      {label: '14', value: '14'},
      {label: '30', value: '30'},
      {label: '100', value: '100'},
    ]);

    const [openFriends, setFriendsOpen] = useState(false);
    const [valueFriends, setFriendsValue] = useState(null);
    const [itemsFriends, setFriendsItems] = useState([
      {label: 'Sarah', value: 'sarah'},
      {label: 'Sophia', value: 'sophia'},
      {label: 'Xin', value: 'xin'},
      {label: 'Wilson', value: 'wilson'}
    ]);

    // if open is already true, close all others
    const onMetricOpen = useCallback(() => {
      setFriendsOpen(false);
      setDurationOpen(false);
    }, []);

    const onFriendsOpen = useCallback(() => {
      setOpen(false);
      setDurationOpen(false);
    }, []);

    const onDurationOpen = useCallback(() => {
      setOpen(false);
      setFriendsOpen(false);
    }, []);

    const copyToClipboard = () => {
      Clipboard.setStringAsync('https://join.sticker.me/89L8d5fhj4')
    }

    ////////////////////////////////////////////NEW STUFF

    const [newItem, setNewItem] = React.useState({
      name: '',
      description: '',
      duration: 0,
      metric: '',
      friends:'',
      createdAt: new Date(),
  });

  const handlePick = () => {
      setNewItem({
          ...newItem,
      });
  
  }

    const onSend = async () => {
      const docRef = await addDoc(collection(database, 'userChallenges'), newItem);
      navigation.goBack();
    }

    return (
      <View style={styles.container}>
        {/* <Text>plus screen</Text> */}
        {/* <Button
          title="Go to stackScreen2"
          onPress={() => navigation.navigate('stackScreen2')}
        /> */}

        <View style={styles.naming}>
          <Text style={styles.title}>
            Create New Challenge
          </Text>
          <TextInput
            style={styles.titleInput}
            //onChangeText={onChangeTitle}
            onChangeText= {(text) => setNewItem({...newItem, name: text})}
            value={title}
            placeholder="| Challenge Title"
            autoCorrect="false"
          />
          <TextInput
            style={styles.input}
            onChangeText= {(text) => setNewItem({...newItem, description: text})}
            value={text}
            placeholder="Enter description for this challenge"
          />
        </View>
        
        <View style={styles.section}>
          <View style={styles.iconTitle}>
            <FontAwesome style={styles.sectionIcon} name="flag-o" size={18} color="white"/>
            <Text style={styles.sectionTitle}>
              Select Goal Metric
            </Text>
          </View>
          <View style={styles.dropDownContainer}>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="Select Metric"
              placeholderStyle={{color: colors.placeholderGray}}
              //onOpen={onMetricOpen}
              onChangeValue={(value) => setNewItem({...newItem, metric: value})}
            />
          </View>
        </View>
        <View style={{ zIndex : -5 }}>
          <View style={styles.section}>
            <View style={styles.iconTitle}>
              <MaterialCommunityIcons style={styles.sectionIcon} name="calendar-clock-outline" color="white" size={18}/>
              <Text style={styles.sectionTitle}>
                Duration
              </Text>
            </View>
            <View style={styles.dropDownContainer}>
              <DropDownPicker
                open={openDuration}
                value={valueDuration}
                items={itemsDuration}
                setOpen={setDurationOpen}
                setValue={setDurationValue}
                setItems={setDurationItems}
                placeholder="Select Number of Days"
                placeholderStyle={{color: colors.placeholderGray}}
                //onOpen={onDurationOpen}
               // onChangeValue = {}
               //onChangeText= {(text) => setNewItem({...newItem, title: text})}
                onChangeValue={(value) => setNewItem({...newItem, duration: value})}
                //onOpen = {(setItems) => setNewItem({...newItem, duration:setItems.value, items:setItems})}
              />
            </View>
          </View>
          <View style={{ zIndex : -5 }}>
            <View style={styles.section}>
              <View style={styles.iconTitle}>
                <MaterialCommunityIcons style={styles.sectionIcon} name="account-group-outline" color="white" size={18}/>
                <Text style={styles.sectionTitle}>
                  Add Friends
                </Text>
              </View>
              <View style={styles.dropDownContainer}>
              <DropDownPicker
                open={openFriends}
                value={valueFriends}
                items={itemsFriends}
                setOpen={setFriendsOpen}
                setValue={setFriendsValue}
                setItems={setFriendsItems}
                onOpen={onFriendsOpen}
                onChangeValue={(value) => setNewItem({...newItem, friends: value})}
                multiple={true}
                mode="BADGE"
                badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#8ac926"]}
                placeholder="Select Friends"
                placeholderStyle={{color: colors.placeholderGray}}
              />
              </View>
            </View>
            <View style={{ zIndex : -5 }}>
              <View style={styles.section}>
                <View style={styles.iconTitle}>
                  <MaterialCommunityIcons style={styles.sectionIcon} name="link-variant" color="white" size={18}/>
                  <Text style={styles.sectionTitle}>
                    Share this Challenge
                  </Text>
                </View>
                <View style={styles.dropDownContainer}>
                  <View style={styles.clipboardContainer}>
                    <TouchableOpacity onPress={() => copyToClipboard()}>
                      <Text>https://join.sticker.me/89L8d5fhj4</Text>
                      {/* <MaterialCommunityIcons style={styles.clipboardIcon} name="clipboard-outline" color={colors.darkGray} size={18}/> */}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={styles.beginChallengeButton}
                onPress={onSend}
                underlayColor='#fff'>
                <Text style={styles.beginChallengeText}>Begin Challenge</Text>
              </TouchableOpacity>
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
    },
    row: {
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "center",
    },
    column: {
        flex: "0%",
    },
    naming: {
      backgroundColor: "white",
      height: 264,
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
      justifyContent: "flex-end",
      paddingLeft: 16,
      marginBottom: 21
    },
    title: {
      fontSize: 24,
      fontWeight: "600",
    },
    titleInput: {
      marginTop: 24,
      fontSize: 20,
    },
    input: {
      marginTop: 24,
      marginBottom: 48,
    },
    section: {
      marginBottom: 11,
    },
    iconTitle: {
      display: "flex",
      flexDirection: "row",
      paddingLeft: 14,
      marginBottom: 6,
    },
    sectionTitle: {
      color: "white",
      fontSize: 18,
    },
    sectionIcon: {
      display: "inline-block",
      marginRight: 7,
    },
    dropDownContainer: {
      paddingHorizontal: 15,
    },
    clipboardContainer: {
      backgroundColor: "white",
      height: 46,
      borderRadius: 7,
      alignItems: "center",
      paddingLeft: 10,
      flexDirection: "row",
    },
    clipboardIcon: {
    },
    beginChallengeButton:{
      marginRight:60,
      marginLeft:60,
      marginTop:23,
      paddingTop:18,
      paddingBottom:18,
      backgroundColor:'white',
      borderRadius:999,
    },
    beginChallengeText:{
        color:'black',
        fontSize: 18,
        fontWeight: "500",
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10
    }
});