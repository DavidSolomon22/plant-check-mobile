import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import stylesGlobal from '../styles/style';

const DisplayTakenPhotoScreen = ({ route, navigation }) => {
  const handleDisplayPhoto = () => {
    navigation.navigate('TakePhotoScreen');
  };
  return (
    <ImageBackground
      source={{ uri: route.params.photoUrl }}
      style={styles.photoContainer}
    >
      <TouchableOpacity
        onPress={() => {
          handleDisplayPhoto(false);
        }}
      >
        <Text style={[styles.text, stylesGlobal.font]}>Retake</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SinglePlantScreen', {
            plantName: 'cactus',
            photoUrl: route.params.photoUrl,
          });
        }}
      >
        <Text style={[styles.text, stylesGlobal.font]}>Predict</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  photoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  text: {
    fontSize: 25,
    marginBottom: 10,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DisplayTakenPhotoScreen;
