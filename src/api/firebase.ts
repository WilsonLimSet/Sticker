import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import Constants from "expo-constants";
import "firebase/firestore";
import "firebase/auth";
import "firebase/compat/storage";

// Firebase config
const firebaseConfig = {
	apiKey: Constants.manifest!.extra!.apiKey,
	authDomain: Constants.manifest!.extra!.authDomain,
	projectId: Constants.manifest!.extra!.projectId,
	storageBucket: Constants.manifest!.extra!.storageBucket,
	messagingSenderId: Constants.manifest!.extra!.messagingSenderId,
	appId: Constants.manifest!.extra!.appId,
	databaseURL: Constants.manifest!.extra!.databaseURL,
};

// initialize firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);
export const storage = getStorage(app);
