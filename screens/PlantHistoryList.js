import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import SinglePlant from '../components/SinglePlant';

const PlantHistoryList = () => {
  return (
    <View>
      <SinglePlant plantName="CACTUS" />
    </View>
  );
};

export default PlantHistoryList;
