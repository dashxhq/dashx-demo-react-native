import {View, StyleSheet, ToastAndroid} from 'react-native';
import React, {useState} from 'react';
import InputText from '../../components/inputText';
import axios from 'axios';
import ShowError from '../../components/showError';
import validate from '../../components/validator';
import ModalView from '../../components/modal';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/header';
import Button from '../../components/button';
import CheckBox from '../../components/checkBox';
import {BASE_URL} from '../../components/APIClient';

export default function RegistrationScreen({navigation}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');
  const [modal, setModal] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  });

  const showToast = responseDaata => {
    ToastAndroid.show(responseDaata, ToastAndroid.SHORT);
  };

  const storeFirstName = value => {
    setFirstName(value);
  };

  const storeLastName = value => {
    setLastName(value);
  };

  const storeEmail = value => {
    setEmail(value);
  };

  const storePassword = value => {
    setPassWord(value);
  };

  const showPassWord = value => {
    setHidePassword(!value);
  };

  const register = async () => {
    setModal(true);
    try {
      const response = await axios({
        method: 'post',
        url: `${BASE_URL}/register`,
        data: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          password,
        }),
        headers: {'Content-Type': 'application/json'},
      });
      setModal(false);
      showToast(response.data.message);
    } catch (error) {
      setModal(false);
      if (error.response.status === 409) {
        showToast('Email already exist');
      } else if (error.response.status === 500) {
        showToast('Internal server error');
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
    if (count === Object.keys(errorMessage).length) {
      register();
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF'}}>
        <ModalView modal={modal} />
        <Header title={'Register'} />
        <View
          style={{
            flex: 1,
            alignSelf: 'stretch',
            marginLeft: 20,
            marginRight: 20,
          }}>
          <InputText
            placeholder={'First Name'}
            onclick={storeFirstName}
            error={errorMessage.firstName}
            firstTextInput={true}
            autoCapitalize={'words'}
          />
          <ShowError message={errorMessage.firstName} />
          <InputText
            placeholder={'Last Name'}
            onclick={storeLastName}
            error={errorMessage.lastName}
            autoCapitalize={'words'}
          />
          <ShowError message={errorMessage.lastName} />
          <InputText
            placeholder={'Email'}
            onclick={storeEmail}
            error={errorMessage.email}
            keyboardType={'email-address'}
          />
          <ShowError message={errorMessage.email} />
          <InputText
            placeholder={'Password'}
            onclick={storePassword}
            secureText={hidePassword}
            error={errorMessage.password}
          />
          <ShowError message={errorMessage.password} />
          <CheckBox onPress={showPassWord} value={hidePassword} />
          <Button
            onclickFunction={validation}
            backgroundColor={'blue'}
            textColor={'white'}
            text={'Register'}
          />
          <Button
            onclickFunction={() => navigation.navigate('Login')}
            backgroundColor={'white'}
            textColor={'blue'}
            text={'Log in'}
            borderColor={'blue'}
            borderWidth={1}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  registerStyle: {
    alignItems: 'center',
    backgroundColor: 'blue',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  LogIn: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  logo: {
    marginRight: 10,
    width: 50,
    height: 50,
  },
});
