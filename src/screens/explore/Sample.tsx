import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
    DocumentReference,
    addDoc,
    collection,
    doc,
    updateDoc,
} from "firebase/firestore";
import { auth, database } from "../../api/firebase";
import { StackNavigationProp } from "@react-navigation/stack";
import { CreateParamList } from "../../navigation/app-nav/CreateParamList";



interface SampleProps {
    navigation: StackNavigationProp<CreateParamList, "Create">;
    id: string;
    name: string;
    days: number;
    metric: string;
}
const handleUseTemplate = (templateData: SampleProps) => {
    const user = auth.currentUser;

    const { id, name, days, metric } = templateData;

    const challengeObj = {
        name: name,
        description: "",
        duration: days,
        metric: metric,
        friends: [user?.uid],
        custom: false,
        startDate: new Date(),
        endDate: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
    };
    console.log(challengeObj);

    addDoc(collection(database, "userChallenges"), challengeObj)
        .then((docRef) => {
            let challengeId = docRef.id;
            var shareCode = challengeId.slice(0, 6);
            updateDoc(doc(database, "userChallenges", challengeId), {
                shareCode,
            });
            // Navigate to the new challenge screen or show a success message
            navigation.navigate("Share", { code: shareCode });
        })
        .catch((error) => {
            // Handle the error
            console.log(error);
        });
};
export const Sample: React.FC<SampleProps> = ({id, name, days,metric}) => {
 
    return(
        <View>
            <View style={styles.productContainer}>
            {/* <MaterialCommunityIcons name="plus-circle" color="black" size={26} /> */}
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.days}>{days} days</Text>
                <Text style={styles.days}>Metric: {metric} </Text>
                
                <TouchableOpacity 
                    onPress={() => handleUseTemplate({ id, name, days, metric })}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Use Template</Text>
                </TouchableOpacity>
            </View>
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
   },
    buttonText: {
        fontSize:  14,
        fontWeight: 'bold',
        color: '#fff',
    },
});