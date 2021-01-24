import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import stylesGlobal from '../styles/style';
import { Colors } from '../styles';
import OverviewItem from '../components/OverviewItem';
import * as Constants from '../constants';
import GoBackIcon from '../components/icons/GoBackIcon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import StatusBarCustom from '../components/StatusBarCustom';
import { getPlantOverview } from '../api/PlantInfoAPI';
import { GATEWAY_ORIGIN, INTERCEPTOR_HOST } from '@env';
import * as SecureStore from 'expo-secure-store';

const SinglePlantScreen = (props) => {
  const { route, navigation } = props;
  const [overViewData, setoverViewData] = useState();
  const [token, setToken] = useState();
  console.log('route :>> ', route);
  console.log('navigation :>> ', navigation);
  const getOverview = async () => {
    try {
      const response = await getPlantOverview(route.params.plantName);
      setoverViewData(response.data);
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
  const getToken = async () => {
    const accessToken = await SecureStore.getItemAsync('access_token');
    setToken(accessToken);
  };
  useEffect(() => {
    getToken();
    getOverview();
  }, []);
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
          <View style={styles.plantNameContainer}>
            <Text style={styles.textStyle}>{route.params.plantName}</Text>
          </View>
        </View>

        <View style={styles.photoAndButtonContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri: `${GATEWAY_ORIGIN}/photos/${route.params.photoUrl}`,
                headers: {
                  Authorization: `Bearer ${token}`,
                  Host: INTERCEPTOR_HOST,
                },
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
            <OverviewItem
              iconName={Constants.ICON_NAMES.SUN}
              iconStatus={overViewData?.sun || 'No data'}
            />
            <OverviewItem
              iconName={Constants.ICON_NAMES.RAIN_DROP}
              iconStatus={overViewData?.water || 'No data'}
            />
          </View>
          <View style={styles.rowIconContainer2}>
            <OverviewItem
              iconName={Constants.ICON_NAMES.POT}
              iconStatus={overViewData?.potSize || 'No data'}
            />
            <OverviewItem
              iconName={Constants.ICON_NAMES.FERTALIZER}
              iconStatus={overViewData?.fertalizer || 'No data'}
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
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 60,
    color: Colors.white,
    fontFamily: 'Staatliches',
    marginRight: '10%',
  },
  plantNameContainer: {
    width: '99%',
    alignItems: 'center',
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
    width: '60%',
    // height: '8%',
    borderRadius: 30,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 3,
  },
  detailsText: {
    // backgroundColor: 'grey',
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
    marginLeft: 50,
  },
  rowIconContainer2: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 50,
    marginBottom: 25,
  },
});

export default SinglePlantScreen;
