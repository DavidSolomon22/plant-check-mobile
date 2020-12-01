import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';

const UserProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>UserProfileScreen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {},
});

export default UserProfileScreen;
