import { Camera } from 'expo-camera';
import React, { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import { Platform, StyleSheet } from 'react-native';
import * as mobilenet from '@tensorflow-models/mobilenet';

import { View, Text } from 'react-native';
import { setdiff1dAsync } from '@tensorflow/tfjs';
import { useWindowDimensions } from 'react-native';

const TensorCamera = cameraWithTensors(Camera);

export default function App(props) {
  const [tfReady, setTfReady] = useState(false);
  const [model, setModel] = useState(false);
  const [displayText, setDisplayText] = useState('loading models');
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  useEffect(() => {
    let checkTf = async () => {
      console.log('loading models');
      await tf.ready();
      console.log('tf ready loading, mobileNet');
      const model = await mobilenet.load();
      console.log('modelnet loaded');
      setModel(model);
      setDisplayText('loaded Models');
      setTfReady(true);
    };
    checkTf();
  }, []);

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

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
  let AUTORENDER = true;
  async function handleCameraStream(images, updatePreview, gl) {
    const loop = async () => {
      if (!AUTORENDER) {
        updatePreview();
      }
      const imageTensor = images.next().value;
      const prediction = await model.classify(imageTensor);
      const highestPropPred = prediction[0];
      const surity = Math.round(highestPropPred.probability * 100);
      if (surity > 30) {
        setDisplayText(highestPropPred.className + ' \n' + surity + '% sure');
      } else {
        setDisplayText('not sure what that is');
      }
      tf.dispose([imageTensor]);

      if (!AUTORENDER) {
        gl.endFrameEXP();
      }
      requestAnimationFrame(loop);
    };

    loop();
  }

  // Currently expo does not support automatically determining the
  // resolution of the camera texture used. So it must be determined
  // empirically for the supported devices and preview size.

  let textureDims;
  if (Platform.OS === 'ios') {
    textureDims = {
      height: 1920,
      width: 1080,
    };
  } else {
    textureDims = {
      height: 1200,
      width: 1600,
    };
  }

  return (
    <View style={styles.container}>
      <Text style={{ height: windowHeight * 0.1 }}>{displayText}</Text>

      {tfReady ? (
        <TensorCamera
          // Standard Camera props
          style={{
            zIndex: -10,
            width: windowWidth * 0.7,
            height: windowHeight * 0.7,
          }}
          type={Camera.Constants.Type.back}
          // Tensor related props
          cameraTextureHeight={textureDims.height}
          cameraTextureWidth={textureDims.width}
          resizeHeight={200}
          resizeWidth={152}
          resizeDepth={3}
          onReady={handleCameraStream}
          autorender={AUTORENDER}
        />
      ) : (
        <View />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#eaeaea',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
