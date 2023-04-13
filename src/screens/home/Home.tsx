import React, { useEffect, useState } from 'react'
import { ScrollView, View, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { getAuth } from 'firebase/auth';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { database } from '../../api/firebase';
import { useDispatch } from "react-redux";
import { setChallengeId } from '../../redux/challengeSlice';
import { Created } from './Created';

interface HomeProps {

}

export const Home: React.FC<HomeProps> = ({}) => {
	const dispatch = useDispatch();
	const [challenges, setChallenges] = useState([]);
	const [isEnabled, setIsEnabled] = useState(true);
	const toggleSwitch = () => setIsEnabled(previousState => !previousState);
	const auth = getAuth();
	const user = auth.currentUser;
	const profileImageUrl = user!.photoURL;
	// TODO: useNavigation is not a function
	// const navigation = useNavigation();
  
	useEffect(() => {
		const collectionRef = collection(database, 'userChallenges');
		const q = query(collectionRef, orderBy('name', 'desc'));
	
		const unsubscribe = onSnapshot(q, querySnapshot => {
			console.log('querySnapshot unsusbscribe');
			setChallenges(
				querySnapshot.docs.map(doc => ({
					id: doc.id,
					name: doc.data().name,
				}))
			);
		});
		return unsubscribe;
	}, []);
  
	const handleNavigation = (id) => {
		dispatch(setChallengeId(id));
		console.log(id);
		navigation.navigate('View Challenge', { id });
	}
	
	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
				<View style={styles.row}>
				{challenges.map(challenge => <Created key={challenge.id} {...challenge} handleNavigation={handleNavigation} />)}
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.darkGray,
		padding: 10,
	},
	row: {
		display: "flex",
		flexDirection: "row-reverse",
		justifyContent: "center",
		flexWrap: "wrap"
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
	titleContainer: {
		flex: 1
	},
	title: {
		paddingLeft: 10,
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