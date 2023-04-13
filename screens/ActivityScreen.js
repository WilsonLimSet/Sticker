import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getDocs, collection } from 'firebase/firestore';
import { database } from "../config/firebase";
import FeedComponent from '../components/FeedComponent';
import colors from '../colors';

export default function ActivityScreen() {
    const [foodEntries, setFoodEntries] = useState([]);
  
    useEffect(() => {
      const fetchFoodEntries = async () => {
        const foodEntriesCollection = collection(database, 'userChallenges');
        const foodEntriesSnapshot = await getDocs(foodEntriesCollection);
        const foodEntriesData = foodEntriesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFoodEntries(foodEntriesData.reverse());
      };
  
      fetchFoodEntries();
    }, []);
  
    return (
      <View style={styles.container}>
        <ScrollView style={{ marginBottom: 100 }}>
          {foodEntries.map((foodEntry) => (
            <View key={foodEntry.id}>
              {foodEntry.imageUrls.map((photoUrl, index) => (
                <FeedComponent
                  key={`${foodEntry.id}_${index}`}
                  photoUrl={photoUrl}
                  metricValue={foodEntry.metric}
                  progressLog={foodEntry.progress[index]}
                  descriptionLog={foodEntry.description[index]}
                  dateLog={foodEntry.date[index]}
                />
              ))}
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
  
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.darkGray,
    },
  });
  