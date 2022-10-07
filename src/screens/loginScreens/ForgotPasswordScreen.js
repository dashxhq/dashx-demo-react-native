import React, {useEffect, useState} from 'react';
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
import Header from '../../components/Header';
import InputText from '../../components/InputText';
import ModalView from '../../components/Modal';
import ErrorMessage from '../../components/ErrorMessage';
import validate from '../../components/validator';
import {APIPost} from '../../utils/ApiClient';
import {BUTTON_BACKGROUND_COLOR_PRIMARY} from '../../styles/global';

export default function ForgotPasswordScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const storeEmail = value => {
    setEmail(value);
  };

  const sendForgotPasswordInstructions = async () => {
    setIsModalVisible(true);
    await APIPost({
      endUrl: 'forgot-password',
      dataObject: {
        email: email,
      },
      headers: {'Content-Type': 'application/json'},
      setIsModalVisible,
    });
    setIsModalVisible(false);
  };

  const validateAndInvokeForgotPassword = () => {
    let validationResponse = validate('email', email);
    setErrorMessage(validationResponse);
    if (validationResponse === true) {
      sendForgotPasswordInstructions();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
              onFocus={() => {
                setErrorMessage(prev => {
                  return {
                    ...prev,
                    email: false,
                  };
                });
              }}
            />
            <ErrorMessage message={errorMessage} />
            <Button
              onPress={() => {
                Keyboard.dismiss(), validateAndInvokeForgotPassword();
              }}
              backgroundColor={BUTTON_BACKGROUND_COLOR_PRIMARY}
              textColor={'white'}
              text={'Submit'}
              style={styles.actionButton}
            />
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text
                  style={{
                    fontSize: 16,
                    color: BUTTON_BACKGROUND_COLOR_PRIMARY,
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
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    paddingVertical: 10,
    marginTop: 20,
  },
});
