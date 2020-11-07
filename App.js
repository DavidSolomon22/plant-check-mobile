import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import FirstScreen from './screens/FirstScreen';
import SecondScreen from './screens/SecondScreen';
import ThirdScreen from './screens/ThirdScreen';
import PlantIcon from './components/icons/PlantIcon';
import PlantHistoryIcon from './components/icons/PlantHistoryIcon';
import ProfileIcon from './components/icons/ProfileIcon';

const BottomTab = createBottomTabNavigator();

const FirstPageStack = createStackNavigator();
const SecondPageStack = createStackNavigator();
const ThirdPageStack = createStackNavigator();

const FirstPageStackScreen = () => {
  return (
    <FirstPageStack.Navigator screenOptions={{ headerShown: false }}>
      <FirstPageStack.Screen name="FirstScreen" component={FirstScreen} />
    </FirstPageStack.Navigator>
  );
};

const SecondPageStackScreen = () => {
  return (
    <SecondPageStack.Navigator screenOptions={{ headerShown: false }}>
      <SecondPageStack.Screen name="SecondScreen" component={SecondScreen} />
    </SecondPageStack.Navigator>
  );
};

const ThirdPageStackScreen = () => {
  return (
    <ThirdPageStack.Navigator screenOptions={{ headerShown: false }}>
      <ThirdPageStack.Screen name="ThirdScreen" component={ThirdScreen} />
    </ThirdPageStack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator
        initialRouteName="FirstScreenTab"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let tabIcon;
            // #000
            if (route.name === 'FirstScreenTab') {
              tabIcon = focused ? (
                <PlantHistoryIcon color="#499D32" />
              ) : (
                <PlantHistoryIcon color="#000" />
              );
            } else if (route.name === 'SecondScreenTab') {
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
          name="FirstScreenTab"
          component={FirstPageStackScreen}
        />
        <BottomTab.Screen
          name="SecondScreenTab"
          component={SecondPageStackScreen}
        />
        <BottomTab.Screen
          name="ThirdScreenTab"
          component={ThirdPageStackScreen}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}
