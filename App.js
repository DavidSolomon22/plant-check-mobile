import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import PlantHistoryList from './screens/PlantHistoryList';
import SecondScreen from './screens/SecondScreen';
import ThirdScreen from './screens/ThirdScreen';

const BottomTab = createBottomTabNavigator();
const FirstPageStack = createStackNavigator();
const SecondPageStack = createStackNavigator();
const ThirdPageStack = createStackNavigator();

const FirstPageStackScreen = () => {
  return (
    <FirstPageStack.Navigator>
      <FirstPageStack.Screen
        name="PlantHistoryList"
        component={PlantHistoryList}
      />
    </FirstPageStack.Navigator>
  );
};

const SecondPageStackScreen = () => {
  return (
    <SecondPageStack.Navigator>
      <SecondPageStack.Screen name="SecondScreen" component={SecondScreen} />
    </SecondPageStack.Navigator>
  );
};

const ThirdPageStackScreen = () => {
  return (
    <ThirdPageStack.Navigator>
      <ThirdPageStack.Screen name="ThirdScreen" component={ThirdScreen} />
    </ThirdPageStack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <BottomTab.Navigator initialRouteName="FirstScreenTab">
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
};

export default App;
