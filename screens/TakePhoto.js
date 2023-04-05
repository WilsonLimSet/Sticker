import * as ImagePicker from "expo-image-picker";
import { getApps, initializeApp } from "firebase/app";
import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  View,
  LogBox,
  Alert,
  Platform,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import uuid from "uuid";
import Constants from "expo-constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getDownloadURL, ref, uploadBytes, getStorage} from "firebase/storage";
import { collection, doc, updateDoc,arrayUnion } from "firebase/firestore";
import { storage, database } from "../config/firebase";
import { useSelector,useDispatch } from 'react-redux';
import { manipulateAsync } from "expo-image-manipulator";
import { setProgress,setDescription} from "./challengeSlice"

const firebaseConfig = {
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  appId: Constants.manifest.extra.appId,
  databaseURL: Constants.manifest.extra.databaseURL,
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

LogBox.ignoreLogs([`Setting a timer for a long period`]);

export default function TakePhoto() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const challengeId = useSelector((state) => state.challenge.challengeId);
  const progressLog = useSelector((state) => state.challenge.progressLog);
  const descriptionLog = useSelector((state) => state.challenge.descriptionLog);

  useEffect(() => {
    async function requestCameraPermissions() {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        } else {
          _takePhoto(); // Launch the camera instantly
        }
      }
    }
    requestCameraPermissions();
  }, []);

  const _maybeRenderUploadingOverlay = () => {
    if (uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(0,0,0,0.4)",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  const _maybeRenderImage = () => {
    if (!image) {
      return;
    }

    return (
      <View
      style={{
        marginTop: 30,
        width: 250,
        borderRadius: 3,
        elevation: 2,
      }}
    >
      <View
        style={{
          borderTopRightRadius: 3,
          borderTopLeftRadius: 3,
          shadowColor: "rgba(0,0,0,1)",
          shadowOpacity: 0.2,
          shadowOffset: { width: 4, height: 4 },
          shadowRadius: 5,
          overflow: "hidden",
        }}
      >
        <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
      </View>
      <Text
        onPress={_copyToClipboard}
        onLongPress={_share}
        style={{ paddingVertical: 10, paddingHorizontal: 10 }}
      >
        {image}
      </Text>
    </View>
  );
  };

  const _share = () => {
    Share.share({
      message: image,
      title: "Check out this photo",
      url: image,
    });
  };

  const _copyToClipboard = () => {
    Clipboard.setString(image);
    alert("Copied image URL to clipboard");
  };

  const _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    _handleImagePicked(pickerResult);
  };

  const _pickImage = async () => {
    
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log({ pickerResult });

    _handleImagePicked(pickerResult);
  };

  const _handleImagePicked = async (pickerResult) => {
    try {
      setUploading(true);
  
      if (!pickerResult.canceled) {
        const asset = pickerResult.assets[0];
         // compress the image
        const compressedImage = await manipulateAsync(
          asset.uri,
          [{ resize: { width: 720 } }],
          { compress: 0.25, format: "jpeg" }
        );
        const uploadUrl = await uploadImageAsync(compressedImage.uri);
        console.log(challengeId);
        console.log(descriptionLog);
        console.log(progressLog)
  
        const docRef = doc(database, "userChallenges", challengeId);
        const data = {
          imageUrls: arrayUnion(uploadUrl),
          description: arrayUnion(descriptionLog),
          progress: arrayUnion(progressLog)
        };
  
        updateDoc(docRef, data).then(() => {
          console.log("A new image URL has been added to the document.");
        }).catch((error) => {
          console.log("Error adding new image URL to document: ", error);
        });
  
        Alert.alert("Success", "Picture saved! 🎉");
        navigation.navigate("Home");
      } else {
        // Navigate to "Log Progress" when the user cancels the image picker
        navigation.navigate("Log Progress");
      }
    } catch (error) {
      console.log(error);
      alert("Upload failed, sorry :(");
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {_maybeRenderImage()}
      {_maybeRenderUploadingOverlay()}
      <StatusBar barStyle="default" />
    </View>
  );
}

async function uploadImageAsync(uri) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });
  const filename = uuid.v4();

  const fileRef = ref(getStorage(), `images/${filename}`);
  const result = await uploadBytes(fileRef, blob);

  // We're done with the blob, close and release it
  blob.close();

  return await getDownloadURL(fileRef);
}
