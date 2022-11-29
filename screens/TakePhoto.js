import { useNavigation } from '@react-navigation/native';
import { React, useState, useCallback } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as Clipboard from 'expo-clipboard';
import colors from '../colors';
import { FontAwesome } from '@expo/vector-icons';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function TakePhoto() {
  return (
    <View style={styles.container}>
        <View style={styles.imgContainer}>
            <Image style={styles.img} source={require('../assets/takePhoto.jpeg')} />
        </View>
        <View style={styles.cameraBar}>
            {/* ICONS HERE */}
        </View>
        {/* going to need to figure out how to remove the tab bar at the bottom via App.js */}
    </View>
);
}



const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: colors.darkGray,
    
},
imgContainer: {
    marginTop: 25,
    height: 566,
    width: 394,
}, 
img: {
    borderRadius: 20,
},
cameraBar: {
    alignItems: "center"
}
});