import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import stylesGlobal from '../styles/style';
import { Colors } from '../styles';
import { Formik } from 'formik';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import * as yup from 'yup';

function equalTo(ref, msg) {
  return this.test({
    name: 'equalTo',
    exclusive: false,
    message: msg || '${path} must be the same as ${reference}',
    params: {
      reference: ref.path,
    },
    test: function (value) {
      return value === this.resolve(ref);
    },
  });
}

yup.addMethod(yup.string, 'equalTo', equalTo);

const loginFormValidationScheme = yup.object({
  username: yup.string().required(),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
    ),
});
const registerFormValidationScheme = yup.object({
  username: yup.string().required(),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
    ),
  confirmPassword: yup.string().equalTo(yup.ref('password')),
});

const LoginRegisterForm = ({ isItLogin, handleLoginRegistration }) => {
  return (
    <Formik
      initialValues={
        isItLogin
          ? { username: '', password: '' }
          : { username: '', password: '', confirmPassword: '' }
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
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
                placeholder="USERNAME"
              />
            </View>
            <Text style={styles.errorText}>
              {touched.username && errors.username}
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
            <Text style={[styles.textsStyle, { fontSize: 23 }]}>LOG IN!</Text>
          ) : (
            <Text style={[styles.textsStyle, { fontSize: 23 }]}>SIGN UP!</Text>
          )}
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  greenStripeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%',
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
  formFieldWithError: {
    height: '20%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '2%',
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
    marginTop: '3%',
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
