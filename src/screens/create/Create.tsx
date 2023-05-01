import React, { useState } from "react";
import { auth, database } from "../../api/firebase";
import {
    DocumentReference,
    addDoc,
    collection,
    doc,
    updateDoc,
} from "firebase/firestore";
import {
    TextInput,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import DropDownPicker from "react-native-dropdown-picker";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CreateParamList } from "../../navigation/app-nav/CreateParamList";
import CalendarPicker from 'react-native-calendar-picker';


interface CreateProps {
    navigation: StackNavigationProp<CreateParamList, "Create">;
    route: RouteProp<CreateParamList, "Create">;
}

const metricItems = [
    { label: "Minutes", value: "minutes" },
    { label: "Days", value: "days" },
    { label: "Miles", value: "miles" },
    { label: "Pounds", value: "pounds" },
    { label: "Custom", value: "custom" },
    { label: "Hours", value: "hours" },
];
export const Create: React.FC<CreateProps> = ({ navigation }) => {
    
    const [endDate, setEndDate] = useState<Date | null>(null);

    const minDate = new Date();
    const maxDayOfMonth = minDate.getDate() + 100;
    const maxDate = new Date(minDate.getFullYear(), minDate.getMonth(), maxDayOfMonth);
    const user = auth.currentUser;
    const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

    

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [metric, setMetric] = useState("");
    const [customMetric, setCustomMetric] = useState("");


    // Drop Down Picker open state
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

    const onSend = async () => {
        if (title === "" || desc === "" || metric === "" ||endDate == null ) {
            Alert.alert("Please fill out all fields");
        } else {
            const challengeObj = {
                name: title,
                description: desc,
                metric: metric === "custom" ? customMetric : metric,
                friends: [user?.uid],
                custom: metric === "custom" ? true : false,
                startDate: new Date(),
                endDate: endDate,
            };

            console.log(challengeObj);
            addDoc(collection(database, "userChallenges"), challengeObj).then(
                (docRef: DocumentReference) => {
                    let challengeId = docRef.id;
                    var shareCode = challengeId.slice(0, 6);
                    updateDoc(doc(database, "userChallenges", challengeId), {
                        shareCode,
                    });
                    setTitle("");
                    setDesc("");
                    setMetric("");
                    setCustomMetric("");
                    setEndDate(null);
                    navigation.navigate("Share", { code: shareCode });
                }
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.naming}>
                <Text style={styles.title}>Create New Challenge</Text>
                <TextInput
                    style={styles.titleInput}
                    onChangeText={(title) => setTitle(title)}
                    placeholder="| Challenge Title"
                    value={title}
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(desc) => setDesc(desc)}
                    placeholder="Enter description for this challenge"
                    value={desc}
                />
            </View>

            <View style={styles.section}>
                <View style={styles.iconTitle}>
                    <FontAwesome
                        style={styles.sectionIcon}
                        name="flag-o"
                        size={18}
                        color="white"
                    />
                    <Text style={styles.sectionTitle}>Select Goal Metric</Text>
                </View>
                <View>
                    <DropDownPicker
                        open={open1}
                        value={metric}
                        items={metricItems}
                        setOpen={setOpen1}
                        setValue={setMetric}
                        placeholder="Select Metric"
                        placeholderStyle={{ color: colors.placeholderGray }}
                        onOpen={() => setOpen2(false)}
                    />
                </View>
            </View>

            {metric === "custom" && (
                <View style={styles.section}>
                    <View style={styles.iconTitle}>
                        <FontAwesome
                            style={styles.sectionIcon}
                            name="flag-o"
                            size={18}
                            color="white"
                        />
                        <Text style={styles.sectionTitle}>
                            Custom Metric Name
                        </Text>
                    </View>

                    <View>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(text) => setCustomMetric(text)}
                            placeholder="custom metric"
                            autoCorrect={false}
                        />
                    </View>
                </View>
            )}

<View style={styles.section}>
<View style={[styles.iconTitle, open1 ? styles.hidden : null]}>
    <MaterialCommunityIcons
        style={styles.sectionIcon}
        name="calendar-clock-outline"
        color="white"
        size={18}
    />
    <Text style={styles.sectionTitle}>Duration</Text>
</View>
    <TouchableOpacity
     onPress={() => setOpen2(!open2)}
     style={[
        styles.selectDateButton,
        open1 ? styles.hidden : null,
    ]}
>
    <Text style={styles.selectDateText}>Select Date</Text>
</TouchableOpacity>

    {/* Render the calendar if Duration dropdown is open */}
    {open2 && (
        <View style={{ backgroundColor: 'white' }}>
            <CalendarPicker 
  startFromMonday={true}
  allowRangeSelection={true}
  minDate={minDate}
  maxDate={maxDate}
  maxRangeDuration={100}
  selectedEndDate={endDate}

  onDateChange={(date, type) => {
    const selectedDate = new Date(date);
    if (selectedDate < minDate) {
      return;
    }
    setEndDate(selectedDate);
    
  }}
  dayStyle={{
    borderWidth: 1,
    borderColor: "#7300e6",
  }}
  textStyle={{
    fontFamily: "System",
    color: "black",
  }}
  style={{ backgroundColor: "white" }}
/>

        </View>
    )}
</View>
<Text style={styles.selectedDatesText}>
  {endDate 
    ? `Dates of Challenge: ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
    : startDate 
      ? `Selected Start Date: ${startDate.toLocaleDateString()}` 
      : "No dates selected"
  }
</Text>


<TouchableOpacity
    style={[
        styles.beginChallengeButton,
        open1 ? styles.hidden : null,
    ]}
    onPress={onSend}
>
    <Text style={styles.beginChallengeText}>Create Challenge</Text>
</TouchableOpacity>

            </View>
       
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkGray,
    },
    selectedDatesText: {
        color: "white",
        fontSize: 16,
        textAlign: "center",
        marginTop: 10,
    },
    
    row: {
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "center",
    },
    naming: {
        backgroundColor: "white",
        height: 160,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        justifyContent: "center",
        paddingLeft: 16,
        marginBottom: 11,
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
    selectDateButton: {
        paddingHorizontal: 15,
        backgroundColor: "white",
        height: 46,
        borderRadius: 7,
        justifyContent: "center",
        alignItems: "center",

    },
    selectDateText: {
        color: "black",
        fontSize: 16,
        
    },

    beginChallengeText: {
        color: "black",
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center",
        paddingLeft: 10,
        paddingRight: 10,
    },
    hidden: {
        display: "none",
    },
    
});
