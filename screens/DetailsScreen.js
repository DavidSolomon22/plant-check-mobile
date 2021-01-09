import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import stylesGlobal from '../styles/style';
import { Colors } from '../styles';
import * as Constants from '../constants';
import { getPlantDetails } from '../api/PlantInfoAPI';
import { GATEWAY_ORIGIN, INTERCEPTOR_HOST } from '@env';
import * as SecureStore from 'expo-secure-store';

const DetailsScreen = (props) => {
  const { route } = props;
  const [detailsData, setDetailsData] = useState();
  const [token, setToken] = useState();
  const getDetails = async () => {
    try {
      const response = await getPlantDetails(route.params.plantName);
      console.log(response.data);
      setDetailsData(response.data);
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
    getDetails();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <View style={styles.plantNameStyle}>
              <Text style={styles.textStyle}>{route.params.plantName}</Text>
            </View>
          </View>
          <View style={[styles.firstContainer, stylesGlobal.androidSafeArea]}>
            <View style={styles.textContainer}>
              <Text style={styles.textTitle}>SUN EXPOSURE</Text>
              <Text style={styles.text}>{detailsData?.sun || 'No data'}</Text>
            </View>
            <View style={styles.imageContainer}>
              {detailsData?.photoPaths?.length > 0 ? (
                <Image
                  source={{
                    uri: `${GATEWAY_ORIGIN}/plant-infos/${route.params.plantName}/photos/${detailsData?.photoPaths[0]}`,
                    headers: {
                      Authorization: `Bearer ${token}`,
                      Host: INTERCEPTOR_HOST,
                    },
                  }}
                  style={styles.image}
                />
              ) : null}
            </View>
          </View>
          <View style={[styles.secondContainer, stylesGlobal.androidSafeArea]}>
            <View style={styles.imageContainer}>
              {detailsData?.photoPaths?.length > 0 ? (
                <Image
                  source={{
                    uri: `${GATEWAY_ORIGIN}/plant-infos/${route.params.plantName}/photos/${detailsData?.photoPaths[1]}`,
                    headers: {
                      Authorization: `Bearer ${token}`,
                      Host: INTERCEPTOR_HOST,
                    },
                  }}
                  style={styles.imageReverse}
                />
              ) : null}
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.textTitleReverse}>WATER</Text>
              <Text style={styles.textReverse}>
                {detailsData?.water || 'No data'}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.container}>
          <View style={[styles.firstContainer, stylesGlobal.androidSafeArea]}>
            <View style={styles.textContainer}>
              <Text style={styles.textTitle}>FERTALIZER</Text>
              <Text style={styles.text}>
                {detailsData?.fertalizer || 'No data'}
              </Text>
            </View>
            <View style={styles.imageContainer}>
              {detailsData?.photoPaths?.length > 0 ? (
                <Image
                  source={{
                    uri: `${GATEWAY_ORIGIN}/plant-infos/${route.params.plantName}/photos/${detailsData?.photoPaths[0]}`,
                    headers: {
                      Authorization: `Bearer ${token}`,
                      Host: INTERCEPTOR_HOST,
                    },
                  }}
                  style={styles.image}
                />
              ) : null}
            </View>
          </View>
          <View style={[styles.secondContainer, stylesGlobal.androidSafeArea]}>
            <View style={styles.imageContainer}>
              {detailsData?.photoPaths?.length > 0 ? (
                <Image
                  source={{
                    uri: `${GATEWAY_ORIGIN}/plant-infos/${route.params.plantName}/photos/${detailsData?.photoPaths[0]}`,
                    headers: {
                      Authorization: `Bearer ${token}`,
                      Host: INTERCEPTOR_HOST,
                    },
                  }}
                  style={styles.imageReverse}
                />
              ) : null}
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.textTitleReverse}>POT SIZE</Text>
              <Text style={styles.textReverse}>
                {detailsData?.potSize || 'No data'}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.green,
    flex: 1,
  },
  scroolContainer: {
    height: '200%',
    width: '100%',
  },
  textStyle: {
    fontSize: 60,
    color: Colors.white,
    fontFamily: 'Staatliches',
  },
  titleContainer: {
    flex: 2,
    backgroundColor: Colors.green,
  },
  plantNameStyle: {
    marginTop: Platform.OS === 'ios' ? 20 : 25,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  firstContainer: {
    height: '40%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginBottom: '8%',
  },
  secondContainer: {
    height: '40%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginBottom: Platform.OS === 'ios' ? '30%' : '30%',
  },
  textContainer: {
    width: '40%',
    height: '60%',
    padding: 1,
  },
  text: {
    marginLeft: '8%',
    color: Colors.white,
    fontWeight: 'bold',
    fontFamily: 'Staatliches',
    fontSize: Platform.OS === 'ios' ? 14 : 13,
  },
  textReverse: {
    marginRight: '8%',
    color: Colors.white,
    fontWeight: 'bold',
    fontFamily: 'Staatliches',
    fontSize: 14,
  },
  textTitle: {
    marginLeft: '8%',
    color: Colors.black,
    fontWeight: '900',
    fontSize: 25,
    fontFamily: 'Staatliches',
  },
  textTitleReverse: {
    marginRight: '8%',
    color: Colors.black,
    fontWeight: '900',
    fontSize: 25,
    fontFamily: 'Staatliches',
  },
  imageContainer: {
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    width: '60%',
    height: '100%',
    marginTop: '9%',
  },
  image: {
    marginLeft: '5%',
    height: '85%',
    width: '80%',
    borderRadius: 30,
  },
  imageReverse: {
    marginLeft: '8%',
    height: '85%',
    width: '80%',
    borderRadius: 30,
    // marginTop: '2%',
  },
  secondPage: {
    flex: 5,
  },
});
export default DetailsScreen;
