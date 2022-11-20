import { View, Text } from 'react-native'
import { signOut } from 'firebase/auth';
import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useCallback
  } from 'react';
  import { TouchableOpacity} from 'react-native';
  import { useNavigation } from '@react-navigation/native';


export default function Bookmark() {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity
              style={{
                marginRight: 10
              }}
              onPress={onSignOut}
            >
              <AntDesign name="logout" size={24} color={colors.gray} style={{marginRight: 10}}/>
            </TouchableOpacity>
          )
        });
      }, );
    return (
        <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
            <Text>Bookmark</Text>
        </View>
    )
}
