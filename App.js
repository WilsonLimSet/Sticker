import React, { useState, createContext, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import {Camera,CameraType} from 'expo-camera';
import * as MedicaLibrary from 'expo-media-library';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Chat from './screens/Chat';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Stats from './screens/Stats';
import Bookmark from './screens/Bookmark';
import challengeScreen1 from './screens/challengeScreen1';
import challengeScreen2 from './screens/challengeScreen2';
import Notification from './screens/Notification';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const challengeStack = createStackNavigator();
const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

function HomeStack() {
  return (
    // <Stack.Navigator defaultScreenOptions={Home}>
    //   <Stack.Screen name='Home' component={Home} />
    //   <Stack.Screen name='Chat' component={Chat} />
    // </Stack.Navigator>
    <Tab.Navigator labeled={false} barStyle={{ backgroundColor: 'black' }} activeColor="white" >
      <Tab.Screen name="Home" component={ChatStack}            //Home Screen
      options={{
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={26}/>
        ),
    }}/>
    
      <Tab.Screen name="Notification" component={Notification}      // Notification Screen
      options={{
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar-text" color={color} size={26}/>
        ),
    }}/>
    <Tab.Screen name="Bookmark" component={ChallengeScreens}      // Notification Screen
      options={{
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bookmark" color={color} size={26}/>
        ),
    }}/>
      <Tab.Screen name="Stats" component={Stats}        // Search Screen
      options={{
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chart-box-outline" color={color} size={26}/>
        ),
    }}/>
      <Tab.Screen name="Profile" component={Profile}            // Profile Screen
      options={{
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={26}/>
        ),
    }}/>
    </Tab.Navigator>
  );
}


function ChatStack() {
  return (
     <Stack.Navigator defaultScreenOptions={Home}>
       <Stack.Screen name='Home' component={Home} />
       <Stack.Screen name='Chat' component={Chat} />
     </Stack.Navigator>
  );
}

function ChallengeScreens(){
  return (
    <challengeStack.Navigator screenOptions={{ headerShown: false }}>
      <challengeStack.Screen name='Create Challenges' component={challengeScreen1} />
      <challengeStack.Screen name='View Challenges' component={challengeScreen2} />
    </challengeStack.Navigator>
  );
}



function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Signup' component={Signup} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);
useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async authenticatedUser => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );
// unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, [user]);
if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

return (
    <NavigationContainer>
      {user ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}