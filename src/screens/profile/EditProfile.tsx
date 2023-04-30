import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Button,
    Image,
    Share,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Alert,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { storage } from "../../api/firebase";

import { getDownloadURL, ref, uploadBytes, deleteObject,getStorage } from "firebase/storage";

import { useSelector } from "react-redux";
import { getAuth, updateProfile } from "firebase/auth";
import { manipulateAsync, SaveOptions} from "expo-image-manipulator";

import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";


// Add your StackParamList type definition here
type StackParamList = {
    EditProfile: undefined;
};

type EditProfileProps = {
    navigation: StackNavigationProp<StackParamList, "EditProfile">;
    route: RouteProp<StackParamList, "EditProfile">;
};

export const EditProfile: React.FC<EditProfileProps> = ({ navigation }) => {
    const [image, setImage] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const challengeId = useSelector((state: any) => state.challenge.challengeId); // Replace 'any' with your state type definition

    const maybeRenderUploadingOverlay = () => {
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

    const share = () => {
        Share.share({
            message: image,
            title: "Check out this photo",
            url: image,
        });
    };

    const maybeRenderImage = () => {
        if (!image) {
            return;
        }
        const imageUrlWithTimestamp = image + `?time=${new Date().getTime()}`; // add timestamp to URL

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
                    <Image
                        source={{ uri: imageUrlWithTimestamp }}
                        style={{ width: 250, height: 250 }}
                    />
                </View>
                <Text
                    onPress={copyToClipboard}
                    onLongPress={share}
                    style={{ paddingVertical: 10, paddingHorizontal: 10 }}
                >
                    {imageUrlWithTimestamp}
                </Text>
            </View>
        );
    };

    const copyToClipboard = () => {
        Clipboard.setString(image);
        alert("Copied image URL to clipboard");
    };

    const _pickImage = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        console.log({ pickerResult });

        _handleImagePicked(pickerResult);
    };

    const _handleImagePicked = async (pickerResult: ImagePicker.ImagePickerResult) => {
        try {
            setUploading(true);
            
            if (!pickerResult.canceled) {
                const asset = pickerResult.assets[0];
                
                // Compress the image
                const compressedImage = await manipulateAsync(
                    asset.uri,
                    [{ resize: { width: 720 } }],
                    { compress: 0.25, format: "jpeg" } as SaveOptions
                );
               
                
                // Get the file reference for the previous profile picture
                const auth = getAuth();
                const user = auth.currentUser;
                const prevProfilePicUrl = user.photoURL;
                const prevProfilePicRef = ref(storage, prevProfilePicUrl);
                
                // Upload the compressed image to Firebase Storage with the same reference as the previous picture
                await uploadBytes(prevProfilePicRef, compressedImage.uri);
    
                // Update user profile picture with the download URL of the new picture
                const uploadUrl = await uploadImageAsync(compressedImage.uri);
                await updateProfile(user, { photoURL: uploadUrl });
                
                setImage(uploadUrl);
                Alert.alert("Success", "Picture saved! 🎉");
                navigation.navigate("EditProfile");
            }
        } catch (e) {
            console.log(e);
            alert("Upload failed, sorry :(");
        } finally {
            setUploading(false);
        }
    };
    
    

    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            {!!image && (
                <Text
                    style={{
                        fontSize: 20,
                        marginBottom: 20,
                        textAlign: "center",
                        marginHorizontal: 15,
                    }}
                >
                    Example: Upload ImagePicker result
                </Text>
            )}

            <Button
                onPress={_pickImage}
                title="Pick an image from camera roll"
            />

            {maybeRenderImage()}
            {maybeRenderUploadingOverlay()}

            <StatusBar barStyle="default" />
        </View>
    );
};

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
    const user = getAuth().currentUser;
    const filename = user.uid;
    const fileRef = ref(getStorage(), `profilepics/${filename}`);
    const result = await uploadBytes(fileRef, blob);

    // We're done with the blob, close and release it
    blob.close();
    return await getDownloadURL(fileRef);
}

