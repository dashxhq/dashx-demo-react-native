import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BASE_URL} from '../../components/APIClient';
import Button from '../../components/button';
import CheckBox from '../../components/checkBox';
import Header from '../../components/header';
import InputText from '../../components/inputText';
import ModalView from '../../components/modal';
import ShowError from '../../components/showError';
import validate from '../../components/validator';
import AppContext from '../../useContext/AppContext';
import {storeValueForKey} from '../../utils/LocalStorage';

const Login = ({navigation}) => {
  const {setUser, setUserToken} = useContext(AppContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState({
    email: false,
    password: false,
  });
  const [hidePassword, setHidePassword] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showToast = responseDaata => {
    ToastAndroid.show(responseDaata, ToastAndroid.SHORT);
  };

  const showPassWord = value => {
    setHidePassword(!value);
  };

  const storeDetails = token => {
    let data = jwt_decode(token);
    setUser(data.user);
    setUserToken(token);
  };

  const storeTokenInAsync = async token => {
    storeValueForKey('userToken', token);
  };

  const logIn = async () => {
    setIsModalVisible(true);
    try {
      const response = await axios({
        method: 'post',
        url: `${BASE_URL}/login`,
        data: JSON.stringify({email: email, password: password}),
        headers: {'Content-Type': 'application/json'},
      });
      setIsModalVisible(false);

      const token = response.data.token;
      storeDetails(token);
      storeTokenInAsync(token);
    } catch (error) {
      setIsModalVisible(false);
      if (error.response.status === 401) {
        showToast('Incorrect email or password');
      } else {
        showToast('Network error');
      }
    }
  };

  const validation = () => {
    let count = 0;
    for (let key in errorMessage) {
      let validationResponse = validate(key, eval(key));
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
    console.log({count, errorMessage});
    if (count === Object.keys(errorMessage).length) {
      logIn();
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
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
          />
          <ShowError message={errorMessage.email} />
          <InputText
            placeholder={'Password'}
            onChangeText={setPassword}
            secureText={hidePassword}
            error={errorMessage.password}
          />
          <ShowError message={errorMessage.password} />
          <CheckBox onPress={showPassWord} value={hidePassword} />
          <Button
            onPress={validation}
            backgroundColor={'blue'}
            textColor={'white'}
            text={'Login'}
          />
          <Button
            onPress={() => navigation.navigate('Registration')}
            backgroundColor={'white'}
            textColor={'blue'}
            text={'Register'}
            borderColor={'blue'}
            borderWidth={1}
          />
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ModalView visible={isModalVisible} />
      </View>
    </SafeAreaView>
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
    color: 'blue',
  },
});

export default Login;
