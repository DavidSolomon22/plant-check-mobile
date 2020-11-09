import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ThirdScreen from '../screens/ThirdScreen';
import PlantIcon from './icons/PlantIcon';
import PlantHistoryIcon from './icons/PlantHistoryIcon';
import ProfileIcon from './icons/ProfileIcon';
import SinglePlantScreen from '../screens/SinglePlantScreen';
import PlantHistoryList from '../screens/PlantHistoryList';
import SecondScreen from '../screens/SecondScreen';

const BottomTab = createBottomTabNavigator();

const PlantHistoryListStack = createStackNavigator();
const SecondPageStack = createStackNavigator();
const ThirdPageStack = createStackNavigator();

const PlantHistoryListStackScreen = () => {
  return (
    <PlantHistoryListStack.Navigator screenOptions={{ headerShown: false }}>
      <PlantHistoryListStack.Screen
        name="PlantHistoryList"
        component={PlantHistoryList}
      />
      <PlantHistoryListStack.Screen
        screenOptions={{ headerShown: false }}
        name="SinglePlantScreen"
        component={SinglePlantScreen}
      />
    </PlantHistoryListStack.Navigator>
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

const Navigation = () => {
  return (
    <NavigationContainer>
      <BottomTab.Navigator
        initialRouteName="PlantHistoryListStackTab"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let tabIcon;
            if (route.name === 'PlantHistoryListStackTab') {
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
          name="PlantHistoryListStackTab"
          component={PlantHistoryListStackScreen}
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
};

export default Navigation;
