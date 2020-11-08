import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import SinglePlant from '../components/SinglePlant';

const PLANTS = [
  {
    plantName: 'CACTUS',
    date: '17-01-2020',
  },
  {
    plantName: 'CACTUS2',
    date: '18-01-2020',
  },
  {
    plantName: 'CACTUS3',
    date: '19-01-2020',
  },
  {
    plantName: 'CACTUS4',
    date: '20-01-2020',
  },
  {
    plantName: 'CACTUS5',
    date: '21-01-2020',
  },
  {
    plantName: 'CACTUS6',
    date: '22-01-2020',
  },
  {
    plantName: 'CACTUS7',
    date: '23-01-2020',
  },
  {
    plantName: 'CACTUS8',
    date: '23-01-2020',
  },
];

const PlantHistoryList = () => {
  return (
    <SafeAreaView>
      <View>
        <Text style={styles.title}>PLANT IDENTIFICATION</Text>
        <Text style={styles.subTitle}>HISTORY</Text>
      </View>
      <View style={styles.plant}>
        <FlatList
          data={PLANTS}
          maxToRenderPerBatch={1}
          contentContainerStyle={{ paddingBottom: 20 }}
          keyExtractor={(item) => item.plantName}
          renderItem={({ item }) => (
            <SinglePlant plantName={item.plantName} date={item.date} />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 45,
    fontFamily: 'Staatliches',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 50,
    fontFamily: 'Staatliches',
    textAlign: 'center',
    color: '#499D32',
  },
  plant: {
    justifyContent: 'center',
  },
});

export default PlantHistoryList;
