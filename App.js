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
import Home from './screens/Home';
import TakePhoto from './screens/TakePhoto';
import ExploreChallenges from './screens/ExploreChallenges';
import Profile from './screens/Profile';
import ActivityScreen from './screens/ActivityScreen';
import CreateChallenge from './screens/CreateChallenge';
import LogProgress from './screens/LogProgress';
import ViewChallenge from './screens/ViewChallenge';
import EditProfile from './screens/EditProfile';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCircleChevronDown } from '@fortawesome/free-solid-svg-icons/faCircleChevronDown';
import colors from './colors';
library.add(fab, faCircleChevronDown)

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
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
    <Tab.Navigator labeled={false} barStyle={{ backgroundColor: colors.tabBar, position: 'absolute', overflow: 'hidden', borderTopLeftRadius: 30, borderTopRightRadius: 30}} activeColor={"black"} screenOptions={{ headerShown: true }}>
      <Tab.Screen name="Home" component={ChallengeStack}            //Home Screen
      options={{
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={26}/>
        ),
    }}/>
      <Tab.Screen name="Notification" component={ExploreChallenges}      // Notification Screen
      options={{
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={26}/>
        ),
    }}/>
    <Tab.Screen name="Challenge" component={CreateChallenge}     // Notification Screen
      options={{
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-circle" color={color} size={26}/>
        ),
    }}/>
      <Tab.Screen name="Stats" component={ActivityScreen}        // Search Screen
      options={{
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chart-box-outline" color={color} size={26}/>
        ),
    }}/>
      <Tab.Screen name="Profile" component={ProfileStack}            // Profile Screen
      options={{
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={26}/>
        ),
    }}/>
    </Tab.Navigator>
  );
}


function ChallengeStack() {
  return (
     <Stack.Navigator defaultScreenOptions={Home}>
       <Stack.Screen name='Home' component={Home} />
       <Stack.Screen name='View Challenge' component={ViewChallenge} />
       <Stack.Screen name='Log Progress' component={LogProgress} />
       <Stack.Screen name='Take Photo' component={TakePhoto} 
       options={{
        headerShown: false,
        tabBarStyle: { display: "none" },
        tabBarVisible:false,
        navigationOptions: {
          headerShown: false,
        }
    }}/>

     </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
     <Stack.Navigator defaultScreenOptions={Profile}>
       <Stack.Screen name='Profile' component={Profile} />
       <Stack.Screen name='EditProfile' component={EditProfile} />
     </Stack.Navigator>
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