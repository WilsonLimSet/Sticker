import * as React from 'react';
import * as RN from 'react-native';
import {database} from "../config/firebase";
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../colors';
import CreateChallenge from '../screens/CreateChallenge';
import { useNavigation } from '@react-navigation/native';

export default function Sample({
    id,
    name,
    days,
}) {
    const navigation = useNavigation();


    return(
        <RN.View>
            <RN.View style={styles.productContainer}>
            {/* <MaterialCommunityIcons name="plus-circle" color="black" size={26} /> */}
                <RN.Text style={styles.name}>{name}</RN.Text>
                <RN.Text style={styles.days}>{days} days</RN.Text>
                

                <RN.TouchableOpacity 
                    // onPress = {CreateChallenge}
                    onPress={() => navigation.navigate('Create Challenge')}
                    style={styles.button}>
                    <RN.Text style={styles.buttonText}>Use Template</RN.Text>
                    
                    </RN.TouchableOpacity>
                    

            </RN.View>
        </RN.View>
    )
}

const styles = RN.StyleSheet.create({
    productContainer: {
        padding: 16,
        backgroundColor: '#B8DCEA',
        margin: 16,
        borderRadius: 8,
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
    },
    days: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'light.gray',
    },
    button: {
        backgroundColor: '#262A31',
        padding: 10,
        marginVertical: 6,
        borderRadius: 8,
        alignItems: 'right'
   },
    buttonText: {
        fontSize:  14,
        fontWeight: 'bold',
        color: '#fff',
    },
});