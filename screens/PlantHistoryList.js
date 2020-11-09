import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import SinglePlant from '../components/SinglePlant';

const PLANTS = [
  {
    plantName: 'CACTUS',
    date: '17-01-2020',
    photoUrl:
      'https://www.juneflowers.ae/pub/media/catalog/product/cache/cf3f2243ef4940fd5c66f2ff035145ac/c/a/cactus_plant.png',
  },
  {
    plantName: 'CACTUS232323',
    date: '18-01-2020',
    photoUrl:
      'https://www.juneflowers.ae/pub/media/catalog/product/cache/cf3f2243ef4940fd5c66f2ff035145ac/c/a/cactus_plant.png',
  },
  {
    plantName: 'CACTUS3',
    date: '19-01-2020',
    photoUrl:
      'https://www.juneflowers.ae/pub/media/catalog/product/cache/cf3f2243ef4940fd5c66f2ff035145ac/c/a/cactus_plant.png',
  },
  {
    plantName: 'CACTUS4',
    date: '20-01-2020',
    photoUrl:
      'https://www.juneflowers.ae/pub/media/catalog/product/cache/cf3f2243ef4940fd5c66f2ff035145ac/c/a/cactus_plant.png',
  },
  {
    plantName: 'CACTUS5',
    date: '21-01-2020',
    photoUrl:
      'https://www.juneflowers.ae/pub/media/catalog/product/cache/cf3f2243ef4940fd5c66f2ff035145ac/c/a/cactus_plant.png',
  },
  {
    plantName: 'CACTUS6',
    date: '22-01-2020',
    photoUrl:
      'https://www.juneflowers.ae/pub/media/catalog/product/cache/cf3f2243ef4940fd5c66f2ff035145ac/c/a/cactus_plant.png',
  },
  {
    plantName: 'CACTUS7',
    date: '22-01-2020',
  },
];

const PlantHistoryList = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={styles.plant}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={PLANTS}
          ListHeaderComponent={
            <View>
              <Text style={styles.title}>PLANT IDENTIFICATION</Text>
              <Text style={styles.subTitle}>HISTORY</Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.plantName}
          renderItem={({ item }) => (
            <SinglePlant
              plantName={item.plantName}
              photoUrl={item.photoUrl}
              date={item.date}
              handlePress={() => {
                navigation.navigate('SinglePlantScreen', {
                  plantName: item.plantName,
                  photoUrl: item.photoUrl,
                });
              }}
            />
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
    alignItems: 'center',
  },
});

export default PlantHistoryList;
