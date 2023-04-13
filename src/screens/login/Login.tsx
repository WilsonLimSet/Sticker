import React from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	SafeAreaView,
	TouchableOpacity,
	StatusBar,
	Alert,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../../api/firebase";
import { useForm } from "react-hook-form";
import { AuthInput } from "./../../ui/AuthInput";
import { colors } from "./../../styles/colors";

interface LoginProps {

}

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const Login: React.FC<LoginProps> = ({}) => {
    const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onHandleLogin = (data) => {
		signInWithEmailAndPassword(auth, data.email, data.password)
			.then(() => console.log("Login success"))
			.catch((err) => Alert.alert("Login error", err.message));
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
				<Text style={styles.title}>Log In</Text>
				<AuthInput
					name='email'
					placeholder='Email'
					placeholderTextColor='#696969'
					control={control}
					keyboardType='email-address'
					secureTextEntry={false}
					autoCapitalize='none'
					rules={{
						required: true,
						pattern: { value: EMAIL_REGEX, message: "Email in invalid" },
					}}
				/>

				<AuthInput
					name='password'
					placeholder='Password'
					placeholderTextColor='#696969'
					control={control}
					keyboardType='default'
					secureTextEntry={true}
					autoCapitalize='none'
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
					onPress={handleSubmit(onHandleLogin)}
				>
					<Text style={{ fontWeight: "bold", color: "black", fontSize: 18 }}>
						{" "}
						Log In
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
					<Text
						style={{ color: colors.lightGray, fontWeight: "600", fontSize: 14 }}
					>
						Don't have an account?{" "}
					</Text>
					<TouchableOpacity onPress={() => navigation.navigate("Signup")}>
						<Text
							style={{ color: colors.primary, fontWeight: "600", fontSize: 14 }}
						>
							Sign Up
						</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
			<StatusBar barStyle='light-content' />
		</View>
    )
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
		paddingBottom: 24,
	},
	input: {
		backgroundColor: "#F6F7FB",
		height: 58,
		marginBottom: 20,
		fontSize: 16,
		borderRadius: 10,
		padding: 12,
	},
	backImage: {},
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