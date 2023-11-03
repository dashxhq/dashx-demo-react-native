import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import DashX from '@dashx/react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../../components/Header';
import InputText from '../../components/InputText';
import Button from '../../components/Button';
import validate from '../../components/validator';
import ErrorMessage from '../../components/ErrorMessage';
import { APIPost } from '../../utils/ApiClient';
import ModalView from '../../components/Modal';
import { showToast } from '../../utils/LocalStorage';
import { BUTTON_BACKGROUND_COLOR_PRIMARY } from '../../styles/global';

const ContactUsScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [newPost, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState({
    name: false,
    email: false,
    newPost: false,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [contactUsValidation, setContactUsValidation] = useState({});

  useEffect(() => {
    setContactUsValidation({
      name: name,
      email: email,
      newPost: newPost,
    });
  }, [name, email, newPost]);

  const contactUs = async () => {
    setIsModalVisible(true);

    DashX.identify({ name, email });

    await APIPost({
      endUrl: 'contact',
      dataObject: {
        name: name,
        email: email,
        feedback: newPost,
      },
    });

    setIsModalVisible(false);
    showToast('Thanks for reaching out! We will get back to you soon.');

    // Clear the form
    setName();
    setEmail();
    setMessage();
  };

  const validation = () => {
    let count = 0;
    for (let key in contactUsValidation) {
      let validationResponse = validate(key, contactUsValidation[key]);
      setErrorMessage((prev) => {
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
      contactUs();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ModalView visible={isModalVisible} />
          <Header title={'Contact Us'} />
          <View
            style={{
              flex: 1,
              marginHorizontal: 20,
            }}
          >
            <InputText
              value={name}
              placeholder={'Name'}
              onChangeText={setName}
              keyboardType={'default'}
              onFocus={() => {
                setErrorMessage((prev) => {
                  return {
                    ...prev,
                    name: true,
                  };
                });
              }}
              error={errorMessage.name}
            />
            <ErrorMessage message={errorMessage.name} />
            <InputText
              value={email}
              placeholder={'Email'}
              onChangeText={setEmail}
              keyboardType={'email-address'}
              onFocus={() => {
                setErrorMessage((prev) => {
                  return {
                    ...prev,
                    email: true,
                  };
                });
              }}
              error={errorMessage.email}
            />
            <ErrorMessage message={errorMessage.email} />
            <InputText
              value={newPost}
              placeholder={'Send us a message'}
              onChangeText={setMessage}
              keyboardType={'default'}
              onFocus={() => {
                setErrorMessage((prev) => {
                  return {
                    ...prev,
                    newPost: true,
                  };
                });
              }}
              error={errorMessage.newPost}
            />
            <ErrorMessage message={errorMessage.newPost} />

            <Button
              style={{ marginTop: 20 }}
              onPress={() => {
                validation();
                Keyboard.dismiss();
              }}
              text={'Submit'}
              textColor="white"
            />
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text
                  style={{
                    marginTop: 30,
                    fontSize: 16,
                    fontWeight: '500',
                    color: BUTTON_BACKGROUND_COLOR_PRIMARY,
                  }}
                >
                  Go back
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ContactUsScreen;
