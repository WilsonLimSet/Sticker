import React, { useState } from "react";
import { Appearance } from 'react-native';
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
import { auth, database } from "../../api/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { colors } from "../../styles/colors";
import { AuthInput } from "../../ui/AuthInput";
import { AuthParamList } from "../../navigation/AuthParamList";
import { StackNavigationProp } from "@react-navigation/stack";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

interface SignUpProps {
    navigation: StackNavigationProp<AuthParamList, "SignUp">;
}

export const SignUp: React.FC<SignUpProps> = ({ navigation }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [date, setDate] = useState(new Date());
    const [isOldEnough, setIsOldEnough] = useState(true);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);


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
            birthday: data.birthday // Add the age to the Firestore document
        });
        await user.reload();
        console.log("Document Added");

        console.log(data);
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (selectedDate) => {
        hideDatePicker();
        setDate(selectedDate);
    
        const age = checkAge(selectedDate); // Calculate the user's age
        if (age >= 13) {
            setIsOldEnough(true);
        } else {
            setIsOldEnough(false);
        }
        setSelectedDate(selectedDate); // update the selected date
    };

    const checkAge = (birthdate: Date) => {
        if (!birthdate) {
            return 0;
        }
        const today = new Date();
        const age = today.getFullYear() - birthdate.getFullYear();
        const birthMonth = birthdate.getMonth();
        const currentMonth = today.getMonth();
        if (currentMonth < birthMonth) {
            age--;
        } else if (currentMonth === birthMonth) {
            const birthDay = birthdate.getDate();
            const currentDay = today.getDate();
            if (currentDay < birthDay) {
                age--;
            }
        }
        return age;
    };

    const colorScheme = Appearance.getColorScheme();

    const onSubmit = (data) => {
        const birthday = date; // Save the selected date as the user's birthday
        const age = checkAge(date); // Calculate the user's age
        if (age >= 13) {
            // Add the age to the data object
            const newData = {
                ...data,
                birthday: birthday,
            };
            onHandleSignup(newData); // Pass the newData object to onHandleSignup
  } else {
            Alert.alert("Sorry", "You are not old enough to create an account");
            }
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
                    {/* <Text style={styles.title}>Sign Up</Text> */}

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
                            pattern: {
                                value: EMAIL_REGEX,
                                message: "Email in invalid",
                            },
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
                        style={styles.datePickerButton}
                        onPress={() =>  setDatePickerVisibility(true)}
                    >
                        <Text style={styles.datePickerButtonText}>Select Your Birthdate</Text>
                        
                    </TouchableOpacity>
                                        {selectedDate && (
                        <Text style={styles.selectedDateText}>
                            Selected date: {selectedDate.toLocaleDateString()}
                        </Text>
                    )}
                    {isDatePickerVisible && (
                        <View style={{ backgroundColor: 'white' }}>
                        <DateTimePickerModal
                          isVisible={isDatePickerVisible}
                          mode="date"
                          onConfirm={handleConfirm}
                          onCancel={hideDatePicker}
                        />
                      </View>
                       
                   
                    )}
                    {isOldEnough ? (
                                <></>
                            ) : (
                                <Text style={styles.errorMessage}>Sorry, you must be at least 13 years old to create an account.</Text>
                            )}

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSubmit(onSubmit)}
                    >
                        <Text
                            style={{
                                fontWeight: "bold",
                                color: "black",
                                fontSize: 18,
                            }}
                        >
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
                        <Text
                            style={{
                                color: "gray",
                                fontWeight: "600",
                                fontSize: 14,
                            }}
                        >
                            Already have an account?{" "}
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Text
                                style={{
                                    color: "#B8DCEA",
                                    fontWeight: "600",
                                    fontSize: 14,
                                }}
                            >
                                Log In
                            </Text>
                        </TouchableOpacity>
                    </View>

                   

                   

                            
            
                            <StatusBar barStyle="light-content" />
                </SafeAreaView>
                </View>
            );
        };


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
    datePickerButton: {
        backgroundColor: colors.lightGray,
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    selectedDateText: {
        fontSize: 16,
        marginVertical: 10,
        color: "white",
        justifyContent: "center",
        alignItems: "center",
    },
    
    datePickerButtonText: {
        fontSize: 18,
        color: "black",
        fontWeight: "bold",
    },
    errorMessage: {
        color: "red",
        marginTop: 10,
    },
});
