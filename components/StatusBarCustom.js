import React from 'react';
import { StyleSheet, View, StatusBar, Platform } from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 30 : StatusBar.currentHeight;

const StatusBarCustom = ({ bgColor, barStyle }) => {
  return (
    <View style={[styles.statusBar, { backgroundColor: bgColor }]}>
      <StatusBar translucent backgroundColor={bgColor} barStyle={barStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});

export default StatusBarCustom;
