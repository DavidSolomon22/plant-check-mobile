import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  font: {
    color: 'white',
    fontFamily: 'Staatliches',
  },
  androidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 22 : 0,
  },
});
