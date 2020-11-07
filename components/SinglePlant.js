import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import stylesGlobal from '../styles/style';

const SinglePlant = ({ plantName }) => {
  const boxColor = {
    backgroundColor: '#499D32',
  };
  return (
    <View style={[styles.box, boxColor]}>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/cactus.jpg')} style={styles.image} />
      </View>
      <View>
        <Text style={[styles.text, stylesGlobal.font]}>{plantName}</Text>
        <Text style={styles.date}>17-01-2020</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>ADD TO YOUR PLANT'S HOME</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 340,
    height: 180,
    borderRadius: 30,
    margin: 10,
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    fontSize: 30,
    marginLeft: 90,
    fontWeight: 'bold',
  },
  date: {
    paddingLeft: 30,
    fontSize: 9,
    marginLeft: 90,
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: 'white',
    borderRadius: 30,
    marginLeft: 70,
    marginTop: 50,
  },
  info: {
    marginTop: 10,
    margin: 8,
    fontSize: 11,
    fontWeight: 'bold',
  },
  textContainer: {
    margin: 10,
    paddingLeft: 50,
  },
  imageContainer: {
    marginLeft: 8,
    height: 180,
    width: 50,
    borderRadius: 30,
    marginTop: 5,
  },
  image: {
    height: 170,
    width: 100,
    borderRadius: 30,
    overflow: 'hidden',
  },
});
export default SinglePlant;
