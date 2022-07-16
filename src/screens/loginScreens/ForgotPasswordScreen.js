import {View, Text, TouchableOpacity, ToastAndroid} from 'react-native';
import React, {useState} from 'react';
import InputText from '../../components/inputText';
import ShowError from '../../components/showError';
import validate from '../../components/validator';
import ModalView from '../../components/modal';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/header';
import Button from '../../components/button';
import {BASE_URL} from '../../components/APIClient';

export default function ForgotPasswordScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [modal, setModal] = useState(false);

  const showToast = responseDaata => {
    ToastAndroid.show(responseDaata, ToastAndroid.SHORT);
  };

  const storeEmail = value => {
    setEmail(value);
  };

  const forgot = async () => {
    setModal(true);
    try {
      await axios({
        method: 'post',
        url: `${BASE_URL}/forgot-password`,
        data: JSON.stringify({email: email}),
        headers: {'Content-Type': 'application/json'},
      });
      setModal(false);
      showToast('link was sent to your mail');
    } catch (error) {
      setModal(false);
      if (error?.response?.status === 500) {
        showToast('Internal server error');
      } else {
        showToast('Network error');
        console.log({error});
      }
    }
  };

  const validation = () => {
    let validationResponse = validate('email', email);
    setErrorMessage(validationResponse);
    if (validationResponse === true) {
      forgot();
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
        <ModalView modal={modal} />
        <Header title={'Forgot Password'} />
        <View
          style={{
            flex: 1,
            alignSelf: 'stretch',
            marginLeft: 20,
            marginRight: 20,
          }}>
          <InputText
            placeholder={'Email'}
            onclick={storeEmail}
            firstTextInput={true}
            error={errorMessage}
            keyboardType={'email-address'}
          />
          <ShowError message={errorMessage} />
          <Button
            onclickFunction={validation}
            backgroundColor={'blue'}
            textColor={'white'}
            text={'Submit'}
          />
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text
                style={{
                  fontSize: 16,
                  color: 'blue',
                  fontWeight: '500',
                  marginTop: 30,
                }}>
                Back to Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
