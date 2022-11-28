import * as React from 'react';
import * as RN from 'react-native';
import {database} from "../config/firebase";
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons';

export default function Sample({
    id,
    name,
    days,
}) {

    const onDelete = () => {
        const docRef = doc(firebase, 'exploreChallenges', id);
        deleteDoc(docRef);
    }

    const onEdit = () => {
        const docRef = doc(firebase, 'exploreChallenges', id);
       
    }

    return(
        <RN.View>
            <RN.View style={styles.productContainer}>
                <RN.Text style={styles.name}>{name}</RN.Text>
                <RN.Text style={styles.days}>{days}Days</RN.Text>
              
                
            
                
            </RN.View>
        </RN.View>
    )
}

const styles = RN.StyleSheet.create({
    productContainer: {
        padding: 16,
        backgroundColor: '#fff',
        margin: 16,
        borderRadius: 8,
    },
    name: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    days: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'gray',
    },
    button: {
        backgroundColor: '#0FA5E9',
        padding: 10,
        marginVertical: 6,
        borderRadius: 8,
        alignItems: 'center'
   },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
});