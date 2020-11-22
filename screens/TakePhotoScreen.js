import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { Camera } from 'expo-camera';
import stylesGlobal from '../styles/style';

const TakePhotoScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState(null);
  const [displayPhoto, handleDisplayPhoto] = useState(false);

  const handleTakePhoto = async () => {
    if (cameraRef) {
      let photoFromCamera = await cameraRef.takePictureAsync();
      setPhoto(photoFromCamera);
      handleDisplayPhoto(true);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (displayPhoto) {
    return (
      <ImageBackground source={photo} style={styles.photoContainer}>
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
              photoUrl: photo,
              isPhotoFromUrl: false,
            });
          }}
        >
          <Text style={[styles.text, stylesGlobal.font]}>Predict</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }

  return (
    <Camera
      style={styles.container}
      type={type}
      ref={(ref) => {
        setCameraRef(ref);
      }}
    >
      <View style={styles.takePhotoBox}>
        <TouchableOpacity onPress={handleTakePhoto}>
          <View style={styles.takePhotoButtonRoundShapeBox}>
            <View style={styles.takePhotoButton} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.flipButton}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back,
            );
          }}
        >
          <Text style={[styles.text, stylesGlobal.font]}> Flip </Text>
        </TouchableOpacity>
      </View>
    </Camera>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  text: {
    fontSize: 25,
    marginBottom: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  takePhotoBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: '8%',
  },
  takePhotoButtonRoundShapeBox: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: 'white',
    height: 60,
    width: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  takePhotoButton: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: 'white',
    height: 50,
    width: 50,
    backgroundColor: 'white',
  },
  flipButton: {
    position: 'absolute',
    right: '3%',
  },
  photoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
});

export default TakePhotoScreen;
