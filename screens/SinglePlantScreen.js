import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  FlatList,
} from 'react-native';
import stylesGlobal from '../styles/style';
import { Colors } from '../styles';
import {
  useFonts,
  Staatliches_400Regular,
} from '@expo-google-fonts/staatliches';
import { AppLoading } from 'expo';
import IconCircle from '../components/IconCircle';
import style from '../styles/style';
import { ICON_NAMES } from '../components/constants';

const SinglePlantScreen = () => {
  let [fontsLoaded, error] = useFonts({
    Staatliches: require('../assets/fonts/Staatliches-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView style={[styles.container, stylesGlobal.androidSafeArea]}>
      <StatusBar backgroundColor={Colors.green} />
      <View style={styles.greenContainer}>
        <Text style={styles.textStyle}>CACTUS</Text>
        <View style={styles.photoAndButtonContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require('../assets/images/cactus.jpg')}
            />
          </View>
          <View style={styles.detailsTextContainer}>
            <Text style={styles.detailsText}>GO TO DETAILS</Text>
          </View>
        </View>
      </View>

      <View style={styles.overViewContainer}>
        <Text style={styles.overviewText}>OVERVIEW</Text>
        <View style={styles.iconsContainer}>
          <View style={styles.rowIconContainer}>
            <FlatList
              data={[ICON_NAMES.FERTALIZER, ICON_NAMES.POT]}
              keyExtractor={(item) => item}
              renderItem={({ item }) => <IconCircle iconName={item} />}
              contentContainerStyle={styles.rowIconContainer}
              style={styles.circle}
            />
          </View>
          <View style={styles.rowIconContainer}>
            <FlatList
              data={[ICON_NAMES.RAIN_DROP, ICON_NAMES.SUN]}
              keyExtractor={(item) => item}
              renderItem={({ item }) => <IconCircle iconName={item} />}
              contentContainerStyle={styles.rowIconContainer}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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
  textStyle: {
    fontSize: 60,
    color: Colors.white,
    fontFamily: 'Staatliches',
    marginTop: 25,
    paddingLeft: 25,
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
    justifyContent: 'space-around',
  },
  circle: {
    // height: '150%',
    // width: '30%',
  },
});

export default SinglePlantScreen;
