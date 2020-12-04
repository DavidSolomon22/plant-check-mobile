import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import stylesGlobal from '../styles/style';
import { Colors } from '../styles';
import { Formik } from 'formik';
import { FontAwesome } from '@expo/vector-icons';

const LoginRegisterForm = ({ isItLogin }) => {
  return (
    <View style={styles.greenStripeContainer}>
      <Formik
        initialValues={
          isItLogin
            ? { username: '', password: '' }
            : { username: '', password: '', confirmPassword: '' }
        }
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.formContainer}>
            {/* Two fields which always occurs */}

            <View style={styles.formField}>
              <FontAwesome name="user-circle" size={24} color="#DADADA" />
              <TextInput
                style={styles.formFieldText}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.email}
                placeholder="USERNAME"
              />
            </View>

            <View style={styles.formField}>
              <FontAwesome name="lock" size={28} color="#DADADA" />
              <TextInput
                style={styles.formFieldText}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                placeholder="PASSWORD"
              />
            </View>

            {/* Display confirm password if register screen is presented */}

            {isItLogin ? (
              <View style={styles.formField}>
                <FontAwesome name="lock" size={28} color="#DADADA" />
                <TextInput
                  style={styles.formFieldText}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  placeholder="CONFIRM PASSWORD"
                />
              </View>
            ) : null}

            {/* Display appropriate button */}

            {isItLogin ? (
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
              >
                <Text style={styles.submitButtonText}>LOGIN</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
              >
                <Text style={styles.submitButtonText}>REGISTER</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </Formik>

      {isItLogin ? (
        <Text
          style={[styles.textsStyle, { fontSize: 18 }, { paddingTop: '5%' }]}
        >
          IF YOU DON'T HAVE AN ACCOUNT
        </Text>
      ) : (
        <Text
          style={[styles.textsStyle, { fontSize: 18 }, { paddingTop: '5%' }]}
        >
          YOU ALREADY HAVE AN ACCOUNT?
        </Text>
      )}

      {isItLogin ? (
        <Text style={[styles.textsStyle, { fontSize: 23 }]}>SIGN UP!</Text>
      ) : (
        <Text style={[styles.textsStyle, { fontSize: 23 }]}>
          SIGN UP!LOG IN!
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  greenStripeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '42%',
    backgroundColor: Colors.green,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  formContainer: {
    alignItems: 'center',
  },
  formField: {
    width: 255,
    height: 35,
    borderRadius: 30,
    backgroundColor: Colors.white,
    marginBottom: '4%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  formFieldText: {
    fontFamily: 'Staatliches',
    fontSize: 17,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    width: '70%',
    marginLeft: '4%',
  },
  submitButton: {
    width: 120,
    backgroundColor: Colors.white,
    borderRadius: 30,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    paddingVertical: '1%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textsStyle: {
    fontFamily: 'Staatliches',
    color: Colors.white,
  },
  submitButtonText: {
    fontFamily: 'Staatliches',
    fontSize: 17,
  },
});

export default LoginRegisterForm;
