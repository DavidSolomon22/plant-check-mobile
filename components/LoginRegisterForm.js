import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../styles';
import { Formik } from 'formik';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import * as yup from 'yup';

// validation schemes

const loginFormValidationScheme = yup.object({
  email: yup.string().required().email(),
  password: yup
    .string()
    .required()
    .min(8)
    .matches(/(?=.*[A-Z])/, 'One Uppercase letter is mandatory')
    .matches(/(?=.*[a-z])/, 'One lowercase letter is mandatory')
    .matches(/(?=.*[0-9])/, 'One number is mandatory'),
});
const registerFormValidationScheme = yup.object({
  email: yup.string().required().email(),
  password: yup
    .string()
    .required()
    .min(8)
    .matches(/(?=.*[A-Z])/, 'One Uppercase letter is mandatory')
    .matches(/(?=.*[a-z])/, 'One lowercase letter is mandatory')
    .matches(/(?=.*[0-9])/, 'One number is mandatory'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const LoginRegisterForm = ({
  isItLogin,
  handleLoginRegistration,
  redirectToLoginRegister,
}) => {
  return (
    <Formik
      initialValues={
        isItLogin
          ? { email: '', password: '' }
          : { email: '', password: '', confirmPassword: '' }
      }
      validationSchema={
        isItLogin ? loginFormValidationScheme : registerFormValidationScheme
      }
      onSubmit={(values, actions) => {
        handleLoginRegistration(values);
        actions.resetForm();
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
      }) => (
        <View style={styles.greenStripeContainer}>
          {/* Two fields which always occurs */}
          <View style={styles.formFieldWithError}>
            <View style={styles.formField}>
              <FontAwesome5 name="user" size={24} color="#DADADA" />
              <TextInput
                style={styles.formFieldText}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder="email"
              />
            </View>
            <Text style={styles.errorText}>
              {touched.email && errors.email}
            </Text>
          </View>

          <View style={styles.formFieldWithError}>
            <View style={styles.formField}>
              <MaterialIcons name="lock-outline" size={24} color="#DADADA" />
              <TextInput
                style={styles.formFieldText}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                placeholder="PASSWORD"
                secureTextEntry={true}
              />
            </View>
            <Text style={styles.errorText}>
              {touched.password && errors.password}
            </Text>
          </View>

          {/* Display confirm password if register screen is presented */}

          {isItLogin ? null : (
            <View style={styles.formFieldWithError}>
              <View style={styles.formField}>
                <MaterialIcons name="lock-outline" size={24} color="#DADADA" />
                <TextInput
                  style={styles.formFieldText}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  placeholder="CONFIRM PASSWORD"
                  secureTextEntry={true}
                />
              </View>
              <Text style={styles.errorText}>
                {touched.confirmPassword && errors.confirmPassword}
              </Text>
            </View>
          )}

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

          <TouchableOpacity
            style={{ alignItems: 'center' }}
            onPress={redirectToLoginRegister}
          >
            {isItLogin ? (
              <Text
                style={[
                  styles.textsStyle,
                  { fontSize: 18 },
                  { paddingTop: '5%' },
                ]}
              >
                IF YOU DON'T HAVE AN ACCOUNT
              </Text>
            ) : (
              <Text
                style={[
                  styles.textsStyle,
                  { fontSize: 18 },
                  { paddingTop: '5%' },
                ]}
              >
                YOU ALREADY HAVE AN ACCOUNT?
              </Text>
            )}

            {isItLogin ? (
              <Text
                style={[
                  styles.textsStyle,
                  { fontSize: 23 },
                  { marginBottom: 35 },
                ]}
              >
                SIGN UP!
              </Text>
            ) : (
              <Text
                style={[
                  styles.textsStyle,
                  { fontSize: 23 },
                  { marginBottom: 35 },
                ]}
              >
                LOG IN!
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  greenStripeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '55%',
    backgroundColor: Colors.green,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  formFieldWithError: {
    height: '18%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '3%',
  },
  formField: {
    width: 255,
    height: 38,
    borderRadius: 30,
    backgroundColor: Colors.white,
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
    fontSize: 15,
    borderBottomColor: 'black',
    borderBottomWidth: 1.5,
    width: '70%',
    marginLeft: '3%',
  },
  errorText: {
    fontFamily: 'Staatliches',
    fontSize: 14,
    textAlign: 'center',
    paddingTop: '1%',
    marginBottom: '2%',
    // backgroundColor: 'grey',
  },
  submitButton: {
    width: 120,
    height: 38,
    backgroundColor: Colors.white,
    borderRadius: 30,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    marginTop: '2%',
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
