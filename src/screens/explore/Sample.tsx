import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface SampleProps {
    id: string;
    name: string;
    days: number;
}

export const Sample: React.FC<SampleProps> = ({id, name, days}) => {
    // TODO: useNavigation is not a function
    // const navigation = useNavigation();

    return(
        <View>
            <View style={styles.productContainer}>
            {/* <MaterialCommunityIcons name="plus-circle" color="black" size={26} /> */}
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.days}>{days} days</Text>
                
                <TouchableOpacity 
                    // onPress = {CreateChallenge}
                    // TODO: onPress={() => navigation.navigate('Create Challenge')}
                    // onPress={() => navigation.navigate('Create Challenge')}
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