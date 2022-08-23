import React, {useState} from 'react';
import {ScrollView, StyleSheet, ToastAndroid, View} from 'react-native';
import {BASE_URL} from '../../components/APIClient';
import Button from '../../components/Button';
import Header from '../../components/Header';
import InputText from '../../components/InputText';
import ModalView from '../../components/Modal';
import ErrorMessage from '../../components/ErrorMessage';
import axios from 'axios';
import validate from '../../components/validator';

export default function RegistrationScreen({navigation}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  });

  const showToast = text => {
    ToastAndroid.show(text, ToastAndroid.SHORT);
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

  const register = async () => {
    setIsModalVisible(true);
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
      setIsModalVisible(false);
      showToast(response.data.message);
    } catch (error) {
      setIsModalVisible(false);
      if (error?.response?.status === 409) {
        showToast('Email already exist');
      } else if (error?.response?.status === 500) {
        showToast('Internal server error');
      } else {
        showToast('Network error');
      }
    }
  };

  const validateAndRegister = () => {
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
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={{flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF'}}>
        <ModalView visible={isModalVisible} />
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
            onChangeText={storeFirstName}
            error={errorMessage.firstName}
            firstTextInput={true}
            autoCapitalize={'words'}
          />
          <ErrorMessage message={errorMessage.firstName} />
          <InputText
            placeholder={'Last Name'}
            onChangeText={storeLastName}
            error={errorMessage.lastName}
            autoCapitalize={'words'}
          />
          <ErrorMessage message={errorMessage.lastName} />
          <InputText
            placeholder={'Email'}
            onChangeText={storeEmail}
            error={errorMessage.email}
            keyboardType={'email-address'}
          />
          <ErrorMessage message={errorMessage.email} />
          <InputText
            placeholder={'Password'}
            onChangeText={storePassword}
            secureText
            error={errorMessage.password}
          />
          <ErrorMessage message={errorMessage.password} />
          <Button
            onPress={validateAndRegister}
            backgroundColor={'blue'}
            textColor={'white'}
            text={'Register'}
            style={styles.registerActionButton}
          />
          <Button
            onPress={() => navigation.navigate('Login')}
            backgroundColor={'white'}
            textColor={'blue'}
            text={'Login'}
            borderColor={'blue'}
            borderWidth={1}
            style={styles.registerActionButton}
          />
        </View>
      </View>
    </ScrollView>
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
  registerActionButton: {
    paddingVertical: 10,
    marginTop: 20,
  },
});
