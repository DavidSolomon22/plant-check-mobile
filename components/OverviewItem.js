import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../styles';
import PotIcon from './icons/PotIcon';
import RainDropIcon from './icons/RainDropIcon';
import SunIcon from './icons/SunIcon';
import FertalizerIcon from './icons/FertalizerIcon';
import * as Constants from '../constants';

const OverviewItem = ({ iconName, iconStatus }) => {
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        {(iconName === Constants.ICON_NAMES.FERTALIZER && <FertalizerIcon />) ||
          (iconName === Constants.ICON_NAMES.RAIN_DROP && <RainDropIcon />) ||
          (iconName === Constants.ICON_NAMES.POT && (
            <PotIcon style={styles.potIconPosition} />
          )) ||
          (iconName === Constants.ICON_NAMES.SUN && <SunIcon />)}
      </View>
      <Text style={styles.iconStatusText}>{iconStatus}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 170,
    paddingRight: 10,
    marginRight: 10,
  },
  circle: {
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
    marginRight: 10,
  },
  potIconPosition: { position: 'relative', left: -2 },
  iconStatusText: { fontFamily: 'Staatliches', fontSize: 19 },
});

export default OverviewItem;
