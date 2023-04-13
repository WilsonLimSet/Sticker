import { getAuth } from 'firebase/auth';
import React from 'react'
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

interface CreatedProps {

}

export const Created: React.FC<CreatedProps> = ({id, name, handleNavigation}) => {
    const auth = getAuth();
    const profileImageUrl = auth.currentUser?.photoURL;
    // TODO: useNavigation is not a function
	// const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => handleNavigation(id)}>
            <View style={styles.entry}>
                <View style={styles.aboveFooter}>
                <View style={styles.circle}></View>
                <Image source={require('./../../../assets/star-logo-simplified.png')} />
                </View>
                <View style={styles.footer}>
                <Text style={styles.title}>{name}</Text>
                <View style={styles.profileBar}>
                    <Image source={{ uri: profileImageUrl }} style={styles.profileBarProfiles}/>
                    <Image source={{ uri: profileImageUrl }} style={styles.profileBarProfiles}/>
                </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
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
    profileBar: {
        backgroundColor: "#A2C4D2",
        height: 42,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
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