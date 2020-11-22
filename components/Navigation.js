import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ThirdScreen from '../screens/ThirdScreen';
import PlantIcon from './icons/PlantIcon';
import PlantHistoryIcon from './icons/PlantHistoryIcon';
import ProfileIcon from './icons/ProfileIcon';
import SinglePlantScreen from '../screens/SinglePlantScreen';
import PlantHistoryListScreen from '../screens/PlantHistoryListScreen';
import Home from '../screens/Home';
import TakePhotoScreen from '../screens/TakePhotoScreen';

const BottomTab = createBottomTabNavigator();

const PlantHistoryListStack = createStackNavigator();
const HomeStack = createStackNavigator();
const ThirdPageStack = createStackNavigator();

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
    </PlantHistoryListStack.Navigator>
  );
};

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="TakePhotoScreen" component={TakePhotoScreen} />
      <HomeStack.Screen
        name="SinglePlantScreen"
        component={SinglePlantScreen}
      />
    </HomeStack.Navigator>
  );
};

const ThirdPageStackScreen = () => {
  return (
    <ThirdPageStack.Navigator screenOptions={{ headerShown: false }}>
      <ThirdPageStack.Screen
        name="TakePhotoScreen"
        component={TakePhotoScreen}
      />
      <ThirdPageStack.Screen
        name="SinglePlantScreen"
        component={SinglePlantScreen}
      />
    </ThirdPageStack.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
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
        tabBarOptions={{ showLabel: false }}
      >
        <BottomTab.Screen
          name="PlantHistoryListStackTab"
          component={PlantHistoryListStackScreen}
        />
        <BottomTab.Screen name="HomeStackTab" component={HomeStackScreen} />
        <BottomTab.Screen
          name="ThirdScreenTab"
          component={ThirdPageStackScreen}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
