import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {BASE_URL} from '../../components/APIClient';
import Button from '../../components/Button';
import Header from '../../components/Header';
import InputText from '../../components/InputText';
import ModalView from '../../components/Modal';
import ErrorMessage from '../../components/ErrorMessage';
import axios from 'axios';
import validate from '../../components/validator';

export default function ForgotPasswordScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showToast = responseData => {
    ToastAndroid.show(responseData, ToastAndroid.SHORT);
  };

  const storeEmail = value => {
    setEmail(value);
  };

  const sendForgotPasswordInstructions = async () => {
    setIsModalVisible(true);
    try {
      await axios({
        method: 'post',
        url: `${BASE_URL}/forgot-password`,
        data: JSON.stringify({email: email}),
        headers: {'Content-Type': 'application/json'},
      });
      setIsModalVisible(false);
      showToast('link was sent to your mail');
    } catch (error) {
      setIsModalVisible(false);
      if (error?.response?.status === 500) {
        showToast('Internal server error');
      } else {
        showToast('Network error');
        // console.log({error});
      }
    }
  };

  const validateAndInvokeForgotPassword = () => {
    let validationResponse = validate('email', email);
    setErrorMessage(validationResponse);
    if (validationResponse === true) {
      sendForgotPasswordInstructions();
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
        <ModalView visible={isModalVisible} />
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
            onChangeText={storeEmail}
            firstTextInput={true}
            error={errorMessage}
            keyboardType={'email-address'}
          />
          <ErrorMessage message={errorMessage} />
          <Button
            onPress={validateAndInvokeForgotPassword}
            backgroundColor={'blue'}
            textColor={'white'}
            text={'Submit'}
            style={styles.actionButton}
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
    </View>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    paddingVertical: 10,
    marginTop: 20,
  },
});
