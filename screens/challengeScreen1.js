import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { View, Text } from 'react-native'
export default function challengeScreen1({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>plus screen</Text>
        <Button
          title="Go to stackScreen2"
          onPress={() => navigation.navigate('stackScreen2')}
        />
      </View>
    );
  }