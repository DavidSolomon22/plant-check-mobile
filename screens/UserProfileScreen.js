import React, { useContext, useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../utilities/AuthUtilities';
import { Colors } from '../styles';
import StatusBarCustom from '../components/StatusBarCustom';
import * as SecureStore from 'expo-secure-store';

const UserProfileScreen = ({ navigation }) => {
  const { signOut } = useContext(AuthContext);
  const [username, setUsername] = useState(null);

  const getUsername = useCallback(async () => {
    const usernameFromSecureStore = await SecureStore.getItemAsync('username');
    setUsername(usernameFromSecureStore);
  }, []);

  useEffect(() => {
    getUsername();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBarCustom bgColor={Colors.white} barStyle="dark-content" />

      <View style={styles.greenContainer}>
        <Text style={styles.loggedInAsText}>LOGGED IN AS</Text>
        <Text style={styles.usernameText}>{username}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={signOut}>
        <Text style={styles.logOutText}>LOG OUT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  greenContainer: {
    marginTop: '23%',
    height: '32%',
    width: '100%',
    backgroundColor: Colors.green,
    paddingLeft: '6%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
  },
  loggedInAsText: {
    fontFamily: 'Staatliches',
    color: Colors.white,
    fontSize: 42,
    marginTop: '6%',
  },
  usernameText: {
    fontFamily: 'Staatliches',
    color: Colors.white,
    fontSize: 30,
    marginTop: '1%',
  },
  button: {
    marginTop: '20%',
    alignItems: 'center',
    backgroundColor: Colors.green,
    borderRadius: 23,
    width: '67%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
  },
  logOutText: {
    padding: 7,
    fontFamily: 'Staatliches',
    fontSize: 27,
    color: Colors.white,
  },
});

export default UserProfileScreen;
