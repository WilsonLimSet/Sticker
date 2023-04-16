import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getDocs, collection } from 'firebase/firestore';
import { database } from '../../api/firebase';
import { FeedItem } from '../../ui/FeedItem';
import { colors } from '../../styles/colors';

interface ActivityProps {}

export const Activity: React.FC<ActivityProps> = ({}) => {
  const [foodEntries, setFoodEntries] = useState([]);

  useEffect(() => {
    const fetchFoodEntries = async () => {
      try {
        const foodEntriesCollection = collection(database, 'userChallenges');
        const foodEntriesSnapshot = await getDocs(foodEntriesCollection);
        const foodEntriesData = foodEntriesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFoodEntries(foodEntriesData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFoodEntries();
  }, []);

  if (!foodEntries || !Array.isArray(foodEntries) || foodEntries.length === 0) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{ marginBottom: 1 }}>
        {foodEntries && foodEntries.length > 0 && foodEntries.map((foodEntry) => (
          <View key={foodEntry.id}>
            {foodEntry.imageUrls && Array.isArray(foodEntry.imageUrls) && foodEntry.imageUrls.map((photoUrl, index) => (
            <FeedItem
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkGray,
  },
});
