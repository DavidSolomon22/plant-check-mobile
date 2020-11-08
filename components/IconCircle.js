import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import stylesGlobal from '../styles/style';
import { Colors } from '../styles';
import PotIcon from './icons/PotIcon';
import RainDropIcon from './icons/RainDropIcon';
import SunIcon from './icons/SunIcon';
import FertalizerIcon from './icons/FertalizerIcon';
import { ICON_NAMES } from './constants';

const IconCirce = ({ iconName }) => {
  return (
    <View style={styles.circles}>
      {(iconName === ICON_NAMES.FERTALIZER && <FertalizerIcon />) ||
        (iconName === ICON_NAMES.RAIN_DROP && <RainDropIcon />) ||
        (iconName === ICON_NAMES.POT && (
          <PotIcon style={styles.potIconPosition} />
        )) ||
        (iconName === ICON_NAMES.SUN && <SunIcon />)}
    </View>
  );
};

const styles = StyleSheet.create({
  circles: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 3,
  },
  potIconPosition: { position: 'relative', left: -2 },
});

export default IconCirce;
