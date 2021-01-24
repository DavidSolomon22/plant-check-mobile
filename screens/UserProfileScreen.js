import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../utilities/AuthUtilities';

const UserProfileScreen = ({ navigation }) => {
  const goToLoginPage = () => {
    navigation.navigate('LoginRegisterScreen', { isItLogin: false });
  };

  const { signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={signOut} style={styles.textContainer}>
        <Text style={styles.logOutText}>Prees here to log out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textContainer: {
    alignItems: 'center',
  },
  logOutText: {
    fontFamily: 'Staatliches',
    fontSize: 40,
  },
});

export default UserProfileScreen;
