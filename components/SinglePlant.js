import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import stylesGlobal from '../styles/style';

const SinglePlant = ({ plantName, date }) => {
  const boxColor = {
    backgroundColor: '#499D32',
  };
  return (
    <View style={[styles.box, boxColor]}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/cactus.png')}
          style={styles.image}
        />
      </View>
      <View>
        <Text style={[styles.text, stylesGlobal.font]}>{plantName}</Text>
        <Text style={styles.date}>{date}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>ADD TO YOUR PLANT'S HOME</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // box: {
  //   width: 340,
  //   height: 170,
  //   borderRadius: 30,
  //   margin: 10,
  //   flexDirection: 'row',
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 4,
  //   },
  //   shadowOpacity: 0.32,
  //   shadowRadius: 5.46,
  // },
  // text: {
  //   color: 'white',
  //   fontSize: 35,
  //   paddingLeft: 40,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
  // date: {
  //   paddingLeft: 30,
  //   fontSize: 14,
  //   marginLeft: 100,
  //   fontWeight: 'bold',
  //   fontFamily: 'Staatliches',
  // },
  // infoContainer: {
  //   backgroundColor: 'white',
  //   borderRadius: 30,
  //   marginLeft: 70,
  //   marginTop: 40,
  //   width: 200,
  //   height: 30,
  // },
  // info: {
  //   marginTop: 7,
  //   fontSize: 15,
  //   fontWeight: 'bold',
  //   fontFamily: 'Staatliches',
  //   textAlign: 'center',
  // },
  // textContainer: {
  //   margin: 10,
  //   paddingLeft: 60,
  // },
  // imageContainer: {
  //   marginLeft: 9,
  //   height: 160,
  //   width: 50,
  //   borderRadius: 30,
  //   marginTop: 10,
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 3,
  //   },
  //   shadowOpacity: 0.27,
  //   shadowRadius: 4.65,
  // },
  // image: {
  //   height: 150,
  //   width: 100,
  //   borderRadius: 30,
  //   overflow: 'hidden',
  // },
  box: {
    flex: 1,
    borderRadius: 30,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    marginBottom: '15%',
  },

  image: {
    height: 130,
    width: 100,
    borderRadius: 30,
    overflow: 'hidden',
    resizeMode: 'cover',
  },
  imageContainer: {
    margin: '3%',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  text: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  date: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Staatliches',
  },
  infoContainer: {
    backgroundColor: 'white',
    borderRadius: 30,
    marginTop: '15%',
    width: 200,
    height: 30,
  },
  info: {
    marginTop: 7,
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Staatliches',
    textAlign: 'center',
  },
  textContainer: {
    margin: 10,
    paddingLeft: 60,
  },
});
export default SinglePlant;
