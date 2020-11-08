import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  font: {
    color: 'white',
  },
  androidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 22 : 0,
  },
});
