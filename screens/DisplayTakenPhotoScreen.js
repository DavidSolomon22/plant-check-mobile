import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import stylesGlobal from '../styles/style';

const DisplayTakenPhotoScreen = ({ route, navigation }) => {
  const handleRetakePhoto = () => {
    navigation.navigate('TakePhotoScreen');
  };

  const handleGoToPrediction = () => {
    navigation.navigate('SinglePlantScreen', {
      plantName: 'cactus',
      photoUrl: route.params.photoUrl,
      goBackAsResetStack: true,
    });
  };

  return (
    <ImageBackground
      source={{ uri: route.params.photoUrl }}
      style={styles.photoContainer}
    >
      <TouchableOpacity onPress={handleRetakePhoto}>
        <Text style={[styles.text, stylesGlobal.font]}>Retake</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleGoToPrediction}>
        <Text style={[styles.text, stylesGlobal.font]}>Predict</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  photoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingBottom: '5%',
  },
  text: {
    fontSize: 25,
    marginBottom: 10,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DisplayTakenPhotoScreen;
