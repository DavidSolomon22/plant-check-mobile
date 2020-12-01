import React from 'react';
import { useFonts } from '@expo-google-fonts/staatliches';
import Navigation from './components/Navigation';

const App = () => {
  const [loaded] = useFonts({
    Staatliches: require('./assets/fonts/Staatliches.ttf'),
  });
  if (!loaded) {
    return null;
  }
  return <Navigation />;
};

export default App;
