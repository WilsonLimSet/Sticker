import { getAuth } from 'firebase/auth';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { ScrollView, View, StyleSheet } from 'react-native';
import { Sample } from './Sample';
import { colors } from '../../styles/colors';
import { database } from '../../api/firebase';

interface ExploreProps {

}

export const Explore: React.FC<ExploreProps> = ({}) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const profileImageUrl = user!.photoURL;
    const [products, setProducts] = useState([]);
    // TODO: useNavigation is not a function
    // const navigation = useNavigation();

    useEffect(() => {
        const collectionRef = collection(database, 'exploreChallenges');
        const q = query(collectionRef, orderBy('name', 'desc'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
        console.log('querySnapshot unsusbscribe');
          setProducts(
            querySnapshot.docs.map(doc => ({
                name: doc.data().name,
                days: doc.data().days,
                metric: doc.data().metric,
            }))
          );
        });
        return unsubscribe;
    }, []);


    return(
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{paddingBottom: 100}}>
            {/* <Text style={styles.title}>Sponsored </Text> */}
                {products.map(product => <Sample key={product.name} {...product} />)}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkGray,
        //backgroundColor: white ,
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
        backgroundColor: '#B8DCEA',
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