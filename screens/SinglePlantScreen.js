import React from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import stylesGlobal from '../styles/style';
import { Colors } from '../styles';
import OverviewItem from '../components/OverviewItem';
import * as Constants from '../constants';
import GoBackIcon from '../components/icons/GoBackIcon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import StatusBarCustom from '../components/StatusBarCustom';
import { PLANT_PREDICTIONS_ORIGIN } from '@env';

const SinglePlantScreen = (props) => {
  const { route, navigation } = props;
  return (
    <View style={styles.container}>
      <StatusBarCustom bgColor={Colors.green} barStyle="light" />
      <View style={[styles.greenContainer, stylesGlobal.androidSafeArea]}>
        <View style={styles.plantNameAndGoBackArrowContainer}>
          <TouchableOpacity
            onPress={() => {
              route.params.goBackAsResetStack
                ? navigation.navigate('TakePhotoScreen')
                : navigation.navigate('PlantHistoryListScreen');
            }}
          >
            <GoBackIcon />
          </TouchableOpacity>
          <Text style={styles.textStyle}>{route.params.plantName}</Text>
        </View>

        <View style={styles.photoAndButtonContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri: `${PLANT_PREDICTIONS_ORIGIN}/photos/${route.params.photoUrl}`,
              }}
            />
          </View>

          <View style={styles.detailsTextContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('DetailsScreen', {
                  plantName: route.params.plantName,
                });
              }}
            >
              <Text style={styles.detailsText}>GO TO DETAILS</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.overViewContainer}>
        <Text style={styles.overviewText}>OVERVIEW</Text>
        <View style={styles.iconsContainer}>
          <View style={styles.rowIconContainer}>
            <FlatList
              data={[Constants.ICON_NAMES.SUN, Constants.ICON_NAMES.RAIN_DROP]}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <OverviewItem iconName={item} iconStatus="JACEK " />
              )}
              contentContainerStyle={styles.rowIconContainer}
              scrollEnabled={false}
            />
          </View>
          <View style={styles.rowIconContainer}>
            <FlatList
              data={[Constants.ICON_NAMES.POT, Constants.ICON_NAMES.FERTALIZER]}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <OverviewItem iconName={item} iconStatus="FILIP" />
              )}
              contentContainerStyle={styles.rowIconContainer}
              scrollEnabled={false}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  greenContainer: {
    flex: 7,
    backgroundColor: Colors.green,
    borderBottomStartRadius: 100,
  },
  overViewContainer: {
    flex: 4.5,
    backgroundColor: Colors.white,
  },
  plantNameAndGoBackArrowContainer: {
    marginTop: 25,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 60,
    color: Colors.white,
    fontFamily: 'Staatliches',
    paddingLeft: 15,
  },
  photoAndButtonContainer: {
    alignItems: 'center',
    height: '73%',
    paddingTop: 10,
  },
  imageContainer: {
    height: '80%',
    width: '45%',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 10,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 30,
  },
  detailsTextContainer: {
    marginHorizontal: 50,
    marginVertical: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: '73%',
    height: '8%',
    borderRadius: 30,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 3,
  },
  detailsText: {
    fontFamily: 'Staatliches',
    fontSize: 23,
    color: Colors.black,
  },
  overviewText: {
    fontSize: 35,
    fontFamily: 'Staatliches',
    marginLeft: 30,
    marginTop: 25,
  },
  iconsContainer: {
    flex: 1,
  },
  rowIconContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
});

export default SinglePlantScreen;
