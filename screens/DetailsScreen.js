import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import stylesGlobal from '../styles/style';
import { Colors } from '../styles';
import * as Constants from '../constants';

const DetailsScreen = (props) => {
  const { route } = props;
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.plantNameStyle}>
          <Text style={styles.textStyle}>{route.params.plantName}</Text>
        </View>
      </View>
      <View style={[styles.firstContainer, stylesGlobal.androidSafeArea]}>
        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>SUN EXPOSURE</Text>
          <Text style={styles.text}>
            {Constants.PLANT_DESCRIPTION.SUN_EXPOSURE}
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri:
                'https://www.juneflowers.ae/pub/media/catalog/product/cache/cf3f2243ef4940fd5c66f2ff035145ac/c/a/cactus_plant.png',
            }}
            style={styles.image}
          />
        </View>
      </View>
      <View style={[styles.secondContainer, stylesGlobal.androidSafeArea]}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri:
                'https://www.juneflowers.ae/pub/media/catalog/product/cache/cf3f2243ef4940fd5c66f2ff035145ac/c/a/cactus_plant.png',
            }}
            style={styles.imageReverse}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textTitleReverse}>WATER</Text>
          <Text style={styles.textReverse}>
            {Constants.PLANT_DESCRIPTION.SUN_EXPOSURE}
          </Text>
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
  textStyle: {
    fontSize: 60,
    color: Colors.black,
    fontFamily: 'Staatliches',
    paddingLeft: 15,
  },
  titleContainer: {
    flex: 2,
    backgroundColor: Colors.white,
  },
  plantNameStyle: {
    marginTop: 25,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  firstContainer: {
    flex: 5,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  secondContainer: {
    flex: 5,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  textContainer: {
    width: '40%',
    height: '100%',
    padding: 1,
  },
  text: {
    marginLeft: '8%',
    color: Colors.green,
    fontWeight: 'bold',
    fontFamily: 'Staatliches',
    fontSize: 14,
  },
  textReverse: {
    marginRight: '8%',
    color: Colors.green,
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
    elevation: 10,
    width: '60%',
    height: '100%',
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
  },
});
export default DetailsScreen;
