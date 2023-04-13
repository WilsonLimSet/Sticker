import React from 'react'
import { StyleSheet,
	Text,
	View,
	Image,
	SafeAreaView,
	TouchableOpacity,
	StatusBar,
	Alert
} from 'react-native';
import { auth, database } from '../../api/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { colors } from '../../styles/colors';
import { AuthInput } from '../../ui/AuthInput';

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

interface SignUpProps {

}

export const SignUp: React.FC<SignUpProps> = ({}) => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();
	
	console.log(errors);
	
	const errorAlert = (error) =>
		Alert.alert("Sign Up Error", error.message, [
		{ text: "OK", onPress: () => console.log("OK Pressed") },
		]);
	
	const onHandleSignup = async (data) => {
		const { user } = await createUserWithEmailAndPassword(
		auth,
		data.email,
		data.password
		);
		await updateProfile(user, {
		displayName: data.fullname,
		photoURL:
			"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
		});
		await setDoc(doc(database, "users", user.uid), {
		username: data.username,
		});
		await user.reload();
		console.log("Document Added");
	
		console.log(data);
	};
	
	return (
		<View style={styles.container}>
		<View style={styles.imgContainer}>
			<Image
			source={require("./../../../assets/sticker-logo.png")}
			style={styles.backImage}
			/>
			<Text
			style={{
				fontSize: 20,
				fontWeight: "400",
				marginBottom: 15,
				color: "white",
			}}
			>
			Welcome to Sticker
			</Text>
		</View>
		<SafeAreaView style={styles.form}>
			<Text style={styles.title}>Sign Up</Text>
	
			<AuthInput
			name="fullname"
			placeholder="Full Name"
			placeholderTextColor="#696969"
			control={control}
			keyboardType="default"
			secureTextEntry={false}
			autoCapitalize="none"
			rules={{ required: "Full Name is required" }}
			/>
	
			<AuthInput
			name="username"
			placeholder="Username"
			placeholderTextColor="#696969"
			control={control}
			keyboardType="default"
			secureTextEntry={false}
			autoCapitalize="none"
			rules={{
				required: "Username is required",
				minLength: {
				value: 3,
				message: "Username must be more than 2 characters",
				},
				maxLength: {
				value: 20,
				message: "Username must be less than 20 characters",
				},
			}}
			/>
	
			<AuthInput
			name="email"
			placeholder="Email"
			placeholderTextColor="#696969"
			control={control}
			keyboardType="email-address"
			secureTextEntry={false}
			autoCapitalize="none"
			rules={{
				required: "Email is required",
				pattern: { value: EMAIL_REGEX, message: "Email in invalid" },
			}}
			/>
	
			<AuthInput
			name="password"
			placeholder="Password"
			placeholderTextColor="#696969"
			control={control}
			keyboardType="default"
			secureTextEntry={true}
			autoCapitalize="none"
			rules={{
				required: "Password is required",
				minLength: {
				value: 8,
				message: "Password must be more than 7 characters",
				},
			}}
			/>
	
			<TouchableOpacity
			style={styles.button}
			onPress={handleSubmit(onHandleSignup)}
			>
			<Text style={{ fontWeight: "bold", color: "black", fontSize: 18 }}>
				{" "}
				Sign Up
			</Text>
			</TouchableOpacity>
			<View
			style={{
				marginTop: 20,
				flexDirection: "row",
				alignItems: "center",
				alignSelf: "center",
			}}
			>
			<Text style={{ color: "gray", fontWeight: "600", fontSize: 14 }}>
				Don't have an account?{" "}
			</Text>
			<TouchableOpacity onPress={() => navigation.navigate("Login")}>
				<Text style={{ color: "#B8DCEA", fontWeight: "600", fontSize: 14 }}>
				Log In
				</Text>
			</TouchableOpacity>
			</View>
		</SafeAreaView>
		<StatusBar barStyle="light-content" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.darkGray,
	},
	imgContainer: {
		alignItems: "center",
	},
	title: {
		fontSize: 30,
		fontWeight: "700",
		color: "white",
		alignSelf: "center",
		paddingBottom: 14,
	},
	form: {
		marginHorizontal: 30,
	},
	button: {
		backgroundColor: "#B8DCEA",
		height: 58,
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 40,
	},
});