import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import SinglePlant from '../components/SinglePlant';
import globalStyles from '../styles/style';
import StatusBarCustom from '../components/StatusBarCustom';
import { Colors } from '../styles';
import * as Constants from '../constants';
import { createPlantPrediction } from '../api/plant-prediction/';

const PlantHistoryListScreen = ({ navigation }) => {
  const predictPhoto = async (predictedPlantName, imageToSave) => {
    try {
      const response = await createPlantPrediction(
        predictedPlantName,
        imageToSave,
      );
      console.log('axios', response);
    } catch (error) {
      // console.error('From axios', e);
      // console.log(e.response);
      // // console.log(e.response.status);
      // // console.log(e.response.headers);
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    }
  };

  return (
    <View style={[globalStyles.androidSafeArea, styles.plant]}>
      <StatusBarCustom bgColor={Colors.white} barStyle="dark-content" />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={Constants.PLANT_HISTORY_LIST}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>PLANT IDENTIFICATION</Text>
            <Text style={styles.subTitle}>HISTORY</Text>
          </View>
        }
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
                goBackAsResetStack: false,
              });
              predictPhoto(item.plantName, item.photoUrl);
            }}
          />
        )}
      />
    </View>
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
    backgroundColor: Colors.white,
    flex: 1,
  },
});

export default PlantHistoryListScreen;
