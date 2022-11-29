import * as React from 'react';
import * as RN from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {database} from "../config/firebase";
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Sample from '../components/Sample';

export default function Test() {

    const [products, setProducts] = React.useState([]);
    const navigation = useNavigation();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <RN.Button title='Add' onPress={() => navigation.navigate('Add')} />
        })
    },[navigation])

    React.useEffect(() => {
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
    return unsubscribe;
    },[])

    return(
        <RN.View style={styles.container}>
            <RN.ScrollView contentContainerStyle={{paddingBottom: 100}}>
            <RN.Text style={styles.title}>Explore Challenges</RN.Text>
                {products.map(product => <Sample key={product.name} {...product} />)}
            </RN.ScrollView>
        </RN.View>
    )
}

const styles = RN.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F3F9',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        margin: 16,
    },
});