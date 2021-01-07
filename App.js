import React from 'react';
import { useFonts } from '@expo-google-fonts/staatliches';
import Navigation from './components/Navigation';
import Toast from 'react-native-toast-message';

const App = () => {
  const [loaded] = useFonts({
    Staatliches: require('./assets/fonts/Staatliches.ttf'),
  });
  if (!loaded) {
    return null;
  }
  return (
    <>
      <Navigation />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
};

export default App;
