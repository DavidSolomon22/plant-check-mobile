import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../utilities/NavigationUtilities';

const UserProfileScreen = ({ navigation }) => {
  const goToLoginPage = () => {
    navigation.navigate('LoginRegisterScreen', { isItLogin: false });
  };

  const { signOut } = useContext(AuthContext);

  return (
    <View style={[{ flex: 1 }, { justifyContent: 'center' }]}>
      <TouchableOpacity onPress={signOut}>
        <Text>Wyloguj sie</Text>
      </TouchableOpacity>
    </View>
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
