import axios from 'axios';
import jwt_decode from 'jwt-decode';
import React, {useContext, useEffect, useState} from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Button from '../../components/Button';
import ErrorMessage from '../../components/ErrorMessage';
import Header from '../../components/Header';
import InputText from '../../components/InputText';
import ModalView from '../../components/Modal';
import validate from '../../components/validator';
import {BUTTON_BACKGROUND_COLOR_PRIMARY} from '../../styles/global';
import AppContext from '../../useContext/AppContext';
import {BASE_URL} from '../../utils/ApiClient';

const Login = ({navigation}) => {
  const {setUser, setUserToken, setDashXToken} = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState({
    email: false,
    password: false,
  });
  const [validation, setValidation] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setValidation({email: email, password: password});
  }, [email, password]);

  const showToast = responseData => {
    ToastAndroid.show(responseData, ToastAndroid.SHORT);
  };

  const storeDetails = token => {
    //TODO Store DashX token
    let data = jwt_decode(token);

    setUser(data.user);
    setUserToken(token);
    setDashXToken(data.dashx_token);
  };

  const logIn = async () => {
    setIsModalVisible(true);
    try {
      const response = await axios({
        method: 'post',
        url: `${BASE_URL}/login`,
        data: JSON.stringify({email, password}),
        headers: {'Content-Type': 'application/json'},
      });
      setIsModalVisible(false);

      const token = response.data.token;
      storeDetails(token);
    } catch (error) {
      setIsModalVisible(false);
      if (error?.response?.status === 401) {
        showToast('Incorrect email or password');
      } else {
        showToast('Network error');
      }
    }
  };

  const validateAndPerformLogin = () => {
    let count = 0;
    for (let key in validation) {
      let validationResponse = validate(key, validation[key]);
      setErrorMessage(prev => {
        return {
          ...prev,
          [key]: validationResponse,
        };
      });
      if (validationResponse !== true) {
        break;
      } else {
        count += 1;
      }
    }

    if (count === Object.keys(errorMessage).length) {
      logIn();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Header title={'Sign in to your Account'} />
        <View
          style={{
            flex: 1,
            alignSelf: 'stretch',
            marginLeft: 20,
            marginRight: 20,
          }}>
          <InputText
            placeholder={'Email'}
            onChangeText={setEmail}
            error={errorMessage.email}
            keyboardType={'email-address'}
            autoCapitalize={'none'}
            onFocus={() => {
              setErrorMessage(prev => {
                return {
                  ...prev,
                  email: false,
                };
              });
            }}
          />
          <ErrorMessage message={errorMessage.email} />
          <InputText
            placeholder={'Password'}
            onChangeText={setPassword}
            secureText
            error={errorMessage.password}
            onFocus={() => {
              setErrorMessage(prev => {
                return {
                  ...prev,
                  password: false,
                };
              });
            }}
          />
          <ErrorMessage message={errorMessage.password} />
          <Button
            onPress={() => {
              Keyboard.dismiss();
              validateAndPerformLogin();
            }}
            backgroundColor={BUTTON_BACKGROUND_COLOR_PRIMARY}
            textColor={'white'}
            text={'Login'}
            style={styles.loginActionButton}
          />
          <Button
            onPress={() => navigation.navigate('Registration')}
            backgroundColor={'white'}
            textColor={BUTTON_BACKGROUND_COLOR_PRIMARY}
            text={'Register'}
            borderColor={BUTTON_BACKGROUND_COLOR_PRIMARY}
            borderWidth={1}
            style={styles.loginActionButton}
          />
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ContactUsScreen')}>
              <Text style={styles.forgotPasswordText}>Contact Us</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ModalView visible={isModalVisible} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  forgotPasswordText: {
    marginTop: 30,
    fontSize: 16,
    fontWeight: '500',
    color: BUTTON_BACKGROUND_COLOR_PRIMARY,
  },
  loginActionButton: {
    paddingVertical: 10,
    marginTop: 20,
  },
});

export default Login;
