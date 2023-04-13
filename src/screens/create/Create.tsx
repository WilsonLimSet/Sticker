import React, { useCallback, useState } from 'react'
import { auth, database } from '../../api/firebase';
import * as Clipboard from "expo-clipboard";
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { TextInput, View, Text, StyleSheet, Button } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from '../../styles/colors';
import DropDownPicker from "react-native-dropdown-picker";

interface CreateProps {

}

export const Create: React.FC<CreateProps> = ({}) => {
    const user = auth.currentUser;

	const [title, onChangeTitle] = useState(null);
	const [text, onChangeText] = useState(null);

	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null);
	const [items, setItems] = useState([
		{ label: "Minutes", value: "minutes" },
		{ label: "Days", value: "days" },
		{ label: "Miles", value: "miles" },
		{ label: "Pounds", value: "pounds" },
		{ label: "Custom", value: "custom" },
		{ label: "Hours", value: "hours" },
	]);

	const [openDuration, setDurationOpen] = useState(false);
	const [valueDuration, setDurationValue] = useState(null);
	const [itemsDuration, setDurationItems] = useState([
		{ label: "7", value: "7" },
		{ label: "14", value: "14" },
		{ label: "30", value: "30" },
		{ label: "100", value: "100" },
	]);

	const [openFriends, setFriendsOpen] = useState(false);
	const [valueFriends, setFriendsValue] = useState(null);
	const [itemsFriends, setFriendsItems] = useState([
		{ label: "Sarah", value: "sarah" },
		{ label: "Sophia", value: "sophia" },
		{ label: "Xin", value: "xin" },
		{ label: "Wilson", value: "wilson" },
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
		Clipboard.setStringAsync("https://join.sticker.me/89L8d5fhj4");
	};

	////////////////////////////////////////////NEW STUFF

	const [newItem, setNewItem] = React.useState({
		name: "",
		description: "",
		duration: 0,
		metric: "",
		friends: [],
		custom: false,
		createdAt: new Date(),
	});

	const handlePick = () => {
		setNewItem({
			...newItem,
		});
	};

	const onSend = async () => {
		setNewItem({ ...newItem, friends: [user.uid] });
		addDoc(collection(database, "userChallenges"), newItem).then((docRef) => {
			let challengeId = docRef._key.path.segments[1];
			let shareCode = challengeId.slice(0, 5);
			console.log(challengeId);
			console.log(shareCode);
			updateDoc(doc(database, "userChallenges", challengeId), {
				shareCode,
			});
		});
        // TODO: NAV
		// navigation.goBack();
	};

	return (
		<View style={styles.container}>
			<View style={styles.naming}>
				<Text style={styles.title}>Create New Challenge</Text>
				<TextInput
					style={styles.titleInput}
					//onChangeText={onChangeTitle}
					onChangeText={(text) => setNewItem({ ...newItem, name: text })}
					value={title}
					placeholder='| Challenge Title'
					autoCorrect={false}
				/>
				<TextInput
					style={styles.input}
					onChangeText={(text) => setNewItem({ ...newItem, description: text })}
					value={text}
					placeholder='Enter description for this challenge'
				/>
			</View>

			<View style={styles.section}>
				<View style={styles.iconTitle}>
					<FontAwesome
						style={styles.sectionIcon}
						name='flag-o'
						size={18}
						color='white'
					/>
					<Text style={styles.sectionTitle}>Select Goal Metric</Text>
				</View>
				<View style={styles.dropDownContainer}>
					<DropDownPicker
						open={open}
						value={value}
						items={items}
						setOpen={setOpen}
						setValue={setValue}
						setItems={setItems}
						placeholder='Select Metric'
						placeholderStyle={{ color: colors.placeholderGray }}
						//onOpen={onMetricOpen}
						onChangeValue={(value) => {
							if (value === "custom") {
								setNewItem({ ...newItem, custom: true });
							} else {
								setNewItem({ ...newItem, metric: value, custom: false });
							}
						}}
					/>
				</View>
			</View>

			{newItem.custom && (
				<View style={styles.section}>
					<View style={styles.iconTitle}>
						<FontAwesome
							style={styles.sectionIcon}
							name='flag-o'
							size={18}
							color='white'
						/>
						<Text style={styles.sectionTitle}>Custom Metric Name</Text>
					</View>

					<View style={styles.dropDownContainer}>
						<TextInput
							style={styles.textInput}
							onChangeText={(text) => setNewItem({ ...newItem, metric: text })}
							value={title}
							placeholder='custom metric'
							autoCorrect={false}
						/>
						{/* <DropDownPicker
							open={open}
							value={value}
							items={items}
							setOpen={setOpen}
							setValue={setValue}
							setItems={setItems}
							placeholder='Custom Metric Name'
							placeholderStyle={{ color: colors.placeholderGray }}
							//onOpen={onMetricOpen}
							onChangeValue={(value) =>
								setNewItem({ ...newItem, metric: value })
							}
						/> */}
					</View>
				</View>
			)}

			<View style={{ zIndex: -5 }}>
				<View style={styles.section}>
					<View style={styles.iconTitle}>
						<MaterialCommunityIcons
							style={styles.sectionIcon}
							name='calendar-clock-outline'
							color='white'
							size={18}
						/>
						<Text style={styles.sectionTitle}>Duration</Text>
					</View>
					<View style={styles.dropDownContainer}>
						<DropDownPicker
							open={openDuration}
							value={valueDuration}
							items={itemsDuration}
							setOpen={setDurationOpen}
							setValue={setDurationValue}
							setItems={setDurationItems}
							placeholder='Select Number of Days'
							placeholderStyle={{ color: colors.placeholderGray }}
							//onOpen={onDurationOpen}
							// onChangeValue = {}
							//onChangeText= {(text) => setNewItem({...newItem, title: text})}
							onChangeValue={(value) =>
								setNewItem({ ...newItem, duration: value })
							}
							//onOpen = {(setItems) => setNewItem({...newItem, duration:setItems.value, items:setItems})}
						/>
					</View>
				</View>

				<View style={styles.beginChallengeButton}>
					<Button
						onPress={onSend}
						title='Create Challenge'
						buttonStyle={{ backgroundColor: "white" }}
						titleProps={{ style: { color: "black" } }}
					/>
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
	naming: {
		backgroundColor: "white",
		height: 264,
		borderBottomLeftRadius: 40,
		borderBottomRightRadius: 40,
		justifyContent: "flex-end",
		paddingLeft: 16,
		marginBottom: 21,
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
		marginRight: 7,
	},

	textInput: {
		paddingHorizontal: 15,
		backgroundColor: "white",
		height: 46,
		borderRadius: 7,
		paddingLeft: 10,
	},

	clipboardContainer: {
		backgroundColor: "white",
		height: 46,
		borderRadius: 7,
		alignItems: "center",
		paddingLeft: 10,
		flexDirection: "row",
	},
	clipboardIcon: {},
	beginChallengeButton: {
		color: "black",
		fontSize: 18,
		fontWeight: "500",
		textAlign: "center",
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 18,
		paddingBottom: 18,
		backgroundColor: "white",
		borderRadius: 999,
		marginRight: 60,
		marginLeft: 60,
		marginTop: 23,
	},
	btnTitle: {
		color: "black",
		fontSize: 18,
		fontWeight: "500",
		textAlign: "center",
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 18,
		paddingBottom: 18,
	},
	btnStyle: {
		backgroundColor: "white",
		borderRadius: 999,
	},
	btnContainer: {
		marginRight: 60,
		marginLeft: 60,
		marginTop: 23,
	},

	beginChallengeText: {
		color: "black",
		fontSize: 18,
		fontWeight: "500",
		textAlign: "center",
		paddingLeft: 10,
		paddingRight: 10,
	},
});