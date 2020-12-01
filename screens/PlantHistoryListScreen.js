import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import SinglePlant from '../components/SinglePlant';
import globalStyles from '../styles/style';
import StatusBarCustom from '../components/StatusBarCustom';
import { Colors } from '../styles';
import * as Constants from '../constants';

const PlantHistoryListScreen = ({ navigation }) => {
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
