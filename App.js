import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ThirdScreen from './screens/ThirdScreen';
import { useFonts } from '@expo-google-fonts/staatliches';
import PlantIcon from './components/icons/PlantIcon';
import PlantHistoryIcon from './components/icons/PlantHistoryIcon';
import ProfileIcon from './components/icons/ProfileIcon';
import SinglePlantScreen from './screens/SinglePlantScreen';
import PlantHistoryList from './screens/PlantHistoryList';

const BottomTab = createBottomTabNavigator();

const FirstPageStack = createStackNavigator();
const SecondPageStack = createStackNavigator();
const ThirdPageStack = createStackNavigator();

const FirstPageStackScreen = () => {
  return (
    <FirstPageStack.Navigator screenOptions={{ headerShown: false }}>
      <FirstPageStack.Screen
        name="PlantHistoryList"
        component={PlantHistoryList}
      />
    </FirstPageStack.Navigator>
  );
};

const SecondPageStackScreen = () => {
  return (
    <SecondPageStack.Navigator screenOptions={{ headerShown: false }}>
      {/* <SecondPageStack.Screen name="SecondScreen" component={SecondScreen} /> */}
      <SecondPageStack.Screen
        name="SinglePlantScreen"
        component={SinglePlantScreen}
      />
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

const App = () => {
  const [loaded] = useFonts({
    Staatliches: require('./assets/fonts/Staatliches.ttf'),
  });
  if (!loaded) {
    return null;
  }
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
};

export default App;
