import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import UserProfileScreen from '../screens/UserProfileScreen';
import PlantIcon from './icons/PlantIcon';
import PlantHistoryIcon from './icons/PlantHistoryIcon';
import ProfileIcon from './icons/ProfileIcon';
import SinglePlantScreen from '../screens/SinglePlantScreen';
import PlantHistoryListScreen from '../screens/PlantHistoryListScreen';
import Home from '../screens/Home';
import TakePhotoScreen from '../screens/TakePhotoScreen';
import DisplayTakenPhotoScreen from '../screens/DisplayTakenPhotoScreen';
import DetailsScreen from '../screens/DetailsScreen';
import LoginRegisterScreen from '../screens/LoginRegisterScreen';
import { determineWhichScreenToDisplay } from '../utilities/NavigationUtilities';
import * as SecureStore from 'expo-secure-store';
import { ImageBackground } from 'react-native';

const LoginRegisterAndBottomTabStack = createStackNavigator();

const BottomTab = createBottomTabNavigator();

const PlantHistoryListStack = createStackNavigator();
const HomeStack = createStackNavigator();
const UserProfileStack = createStackNavigator();

const PlantHistoryListStackScreen = () => {
  return (
    <PlantHistoryListStack.Navigator screenOptions={{ headerShown: false }}>
      <PlantHistoryListStack.Screen
        name="PlantHistoryListScreen"
        component={PlantHistoryListScreen}
      />
      <PlantHistoryListStack.Screen
        name="SinglePlantScreen"
        component={SinglePlantScreen}
      />
      <PlantHistoryListStack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
      />
    </PlantHistoryListStack.Navigator>
  );
};

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="TakePhotoScreen" component={TakePhotoScreen} />
      <HomeStack.Screen
        name="SinglePlantScreen"
        component={SinglePlantScreen}
      />
      <HomeStack.Screen
        name="DisplayTakenPhotoScreen"
        component={DisplayTakenPhotoScreen}
      />
      <HomeStack.Screen name="DetailsScreen" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
};

const UserProfileStackScreen = () => {
  return (
    <UserProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <UserProfileStack.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
      />
      <UserProfileStack.Screen
        name="LoginRegisterScreen"
        component={LoginRegisterScreen}
      />
    </UserProfileStack.Navigator>
  );
};

const BottomTabScreen = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="HomeStackTab"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let tabIcon;
          if (route.name === 'PlantHistoryListStackTab') {
            tabIcon = focused ? (
              <PlantHistoryIcon color="#499D32" />
            ) : (
              <PlantHistoryIcon color="#000" />
            );
          } else if (route.name === 'HomeStackTab') {
            tabIcon = focused ? (
              <PlantIcon color="#499D32" />
            ) : (
              <PlantIcon color="#000" />
            );
          } else {
            tabIcon = focused ? (
              <ProfileIcon color="#499D32" />
            ) : (
              <ProfileIcon color="#000" />
            );
          }
          return tabIcon;
        },
      })}
      tabBarOptions={{ showLabel: false, keyboardHidesTabBar: true }}
    >
      <BottomTab.Screen
        name="PlantHistoryListStackTab"
        component={PlantHistoryListStackScreen}
      />
      <BottomTab.Screen name="HomeStackTab" component={HomeStackScreen} />
      <BottomTab.Screen
        name="UserProfileTab"
        component={UserProfileStackScreen}
      />
    </BottomTab.Navigator>
  );
};

const Navigation = () => {
  const [areTokensAvailable, setAreTokensAvailable] = useState('');

  const innerFunction = useCallback(async () => {
    const token = await SecureStore.getItemAsync('access_token');
    console.log('TOKEN', token);
    if (token) {
      setAreTokensAvailable(true);
    }
  }, []);

  useEffect(() => {
    innerFunction();
  }, []);

  if (areTokensAvailable === '') {
    return (
      <ImageBackground
        source={require('../assets/images/splash.png')}
        style={{ flex: 1 }}
      />
    );
  }

  return (
    <NavigationContainer>
      <LoginRegisterAndBottomTabStack.Navigator
        initialRouteName="LoginRegisterScreen"
        screenOptions={{ headerShown: false }}
      >
        {areTokensAvailable ? (
          <LoginRegisterAndBottomTabStack.Screen
            name="BottomTabScreen"
            component={BottomTabScreen}
          />
        ) : (
          <LoginRegisterAndBottomTabStack.Screen
            name="LoginRegisterScreen"
            component={LoginRegisterScreen}
            initialParams={{ isItLogin: true }}
          />
        )}
      </LoginRegisterAndBottomTabStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
