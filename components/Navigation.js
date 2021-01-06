import React, { useState, useEffect, useMemo, useReducer } from 'react';
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
import * as SecureStore from 'expo-secure-store';
import { ImageBackground } from 'react-native';
import { AuthContext } from '../utilities/NavigationUtilities';
import { loginUser, registerUser } from '../api/AuthAPI';

const LoginRegisterStack = createStackNavigator();

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
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(
    () => ({
      signIn: async (userName, password) => {
        try {
          let userToken;
          userToken = null;
          const response = await loginUser(userName, password);

          if (response.status === 201) {
            userToken = response.data.access_token;
            await SecureStore.setItemAsync(
              'access_token',
              response.data.access_token,
            );
            await SecureStore.setItemAsync(
              'refresh_token',
              response.data.refresh_token,
            );
            dispatch({
              type: 'LOGIN',
              id: userName,
              token: userToken,
            });
          }
        } catch (error) {
          console.log('my error', error);
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      },
      signOut: async () => {
        try {
          await SecureStore.deleteItemAsync('access_token');
          dispatch({ type: 'LOGOUT' });
        } catch (error) {}
      },
      signUp: async (userName, password) => {},
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await SecureStore.getItemAsync('access_token');

        dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
      } catch (error) {}
    }, 2000);
  }, []);

  if (loginState.isLoading) {
    return (
      <ImageBackground
        source={require('../assets/images/splash.png')}
        style={{ flex: 1 }}
      />
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? (
          <BottomTabScreen />
        ) : (
          <LoginRegisterStack.Navigator
            initialRouteName="LoginScreen"
            screenOptions={{ headerShown: false }}
          >
            <LoginRegisterStack.Screen
              name="LoginScreen"
              component={LoginRegisterScreen}
              initialParams={{ isItLogin: true }}
              options={{
                animationEnabled: false,
              }}
            />
            <LoginRegisterStack.Screen
              name="RegisterScreen"
              component={LoginRegisterScreen}
              initialParams={{ isItLogin: false }}
              options={{
                animationEnabled: false,
              }}
            />
          </LoginRegisterStack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default Navigation;
