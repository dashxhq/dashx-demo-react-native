import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Button from '../../components/Button';
import Header from '../../components/Header';
import InputText from '../../components/InputText';
import ModalView from '../../components/Modal';
import ErrorMessage from '../../components/ErrorMessage';
import validate from '../../components/validator';
import {APIPost} from '../../utils/ApiClient';
import {BUTTON_BACKGROUND_COLOR_PRIMARY} from '../../styles/global';

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
  const [validation, setValidation] = useState({});

  useEffect(() => {
    setValidation({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });
  }, [firstName, lastName, email, password]);

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
    await APIPost({
      endUrl: 'register',
      dataObject: {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      },
      headers: {'Content-Type': 'application/json'},
      setIsModalVisible,
    });
    setIsModalVisible(false);
  };

  const validateAndRegister = () => {
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
      register();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
            onFocus={() => {
              setErrorMessage(prev => {
                return {
                  ...prev,
                  firstName: false,
                };
              });
            }}
          />
          <ErrorMessage message={errorMessage.firstName} />
          <InputText
            placeholder={'Last Name'}
            onChangeText={storeLastName}
            error={errorMessage.lastName}
            autoCapitalize={'words'}
            onFocus={() => {
              setErrorMessage(prev => {
                return {
                  ...prev,
                  lastName: false,
                };
              });
            }}
          />
          <ErrorMessage message={errorMessage.lastName} />
          <InputText
            placeholder={'Email'}
            onChangeText={storeEmail}
            error={errorMessage.email}
            keyboardType={'email-address'}
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
            onChangeText={storePassword}
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
            onPress={validateAndRegister}
            backgroundColor={BUTTON_BACKGROUND_COLOR_PRIMARY}
            textColor={'white'}
            text={'Register'}
            style={styles.registerActionButton}
          />
          <Button
            onPress={() => navigation.navigate('Login')}
            backgroundColor={'white'}
            textColor={BUTTON_BACKGROUND_COLOR_PRIMARY}
            text={'Login'}
            borderColor={BUTTON_BACKGROUND_COLOR_PRIMARY}
            borderWidth={1}
            style={styles.registerActionButton}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  registerStyle: {
    alignItems: 'center',
    backgroundColor: BUTTON_BACKGROUND_COLOR_PRIMARY,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  LogIn: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: BUTTON_BACKGROUND_COLOR_PRIMARY,
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
