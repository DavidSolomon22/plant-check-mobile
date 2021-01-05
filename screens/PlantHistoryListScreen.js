import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import SinglePlant from '../components/SinglePlant';
import globalStyles from '../styles/style';
import StatusBarCustom from '../components/StatusBarCustom';
import { Colors } from '../styles';
import * as Constants from '../constants';
import { getUserPlantPredictions } from '../api/plant-prediction/';

const PlantHistoryListScreen = ({ navigation }) => {
  const [dataSource, setDataSource] = useState([]);
  const getPredictions = async () => {
    try {
      const response = await getUserPlantPredictions();
      setDataSource(response.data.predictions);
    } catch (error) {
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

  useEffect(() => {
    getPredictions();
  }, []);
  return (
    <View style={[globalStyles.androidSafeArea, styles.plant]}>
      <StatusBarCustom bgColor={Colors.white} barStyle="dark-content" />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={dataSource}
        extraData={Constants.PLANT_HISTORY_LIST}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>PLANT IDENTIFICATION</Text>
            <Text style={styles.subTitle}>HISTORY</Text>
          </View>
        }
        keyExtractor={(item) => item.predictedPlantName}
        renderItem={({ item }) => (
          <SinglePlant
            plantName={item.predictedPlantName}
            photoUrl={item.photoPath}
            date={item.timestamp}
            handlePress={() => {
              navigation.navigate('SinglePlantScreen', {
                plantName: item.predictedPlantName,
                photoUrl: item.photoPath,
                goBackAsResetStack: false,
              });
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
