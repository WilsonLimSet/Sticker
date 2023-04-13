import { StyleSheet, Text, View } from 'react-native';
import { Login } from './src/screens/login/Login';
import { SignUp } from './src/screens/login/SignUp';
import { Home } from './src/screens/home/Home';
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import challengeReducer from './src/redux/challengeSlice'

const store = configureStore({
	reducer: {
		challenge: challengeReducer,
	},
});

export default function App() {
	return (
		<Provider store={store}>
			<View style={styles.container}>
				{/* <SignUp /> */}
				{/* <Login /> */}
				<Home />
			</View>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});
