import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import SinglePlant from '../components/SinglePlant';
import globalStyles from '../styles/style';
import StatusBarCustom from '../components/StatusBarCustom';
import { Colors } from '../styles';
import * as Constants from '../constants';
import { getUserPlantPredictions } from '../api/plant-prediction/';
import Moment from 'moment';

const PlantHistoryListScreen = ({ navigation }) => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const getPredictions = async () => {
    try {
      setLoading(true);
      const response = await getUserPlantPredictions();
      setDataSource(response.data.predictions);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setDataSource(null);
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
  const onRefresh = async () => {
    setRefreshing(true);
    getPredictions();
    setRefreshing(false);
  };

  useEffect(() => {
    getPredictions();
  }, []);
  return (
    <View
      style={[
        globalStyles.androidSafeArea,
        loading == false ? styles.plant : styles.withOpacity,
      ]}
    >
      <StatusBarCustom bgColor={Colors.white} barStyle="dark-content" />

      {loading ? (
        <ActivityIndicator
          style={styles.spinner}
          animating={loading}
          size="large"
          color="black"
        />
      ) : (
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
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyExtractor={(item) => item.predictedPlantName}
          renderItem={({ item }) => (
            <SinglePlant
              plantName={item.predictedPlantName}
              photoUrl={item.photoPath}
              date={Moment(item.timestamp).format('DD/MM/YYYY, h:mm:ss a')}
              handlePress={() => {
                console.log(item.photoPath);
                navigation.navigate('SinglePlantScreen', {
                  plantName: item.predictedPlantName,
                  photoUrl: item.photoPath,
                  goBackAsResetStack: false,
                });
              }}
            />
          )}
        />
      )}
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
  withOpacity: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    flex: 1,
    opacity: 0.4,
  },
  spinner: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PlantHistoryListScreen;
