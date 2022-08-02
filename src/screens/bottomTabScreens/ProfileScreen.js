import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import AppContext from '../../useContext/AppContext';
import {BASE_URL} from '../../components/APIClient';
import Button from '../../components/Button';
import InputText from '../../components/InputText';
import ModalView from '../../components/Modal';
import ErrorMessage from '../../components/ErrorMessage';
import axios from 'axios';
import validate from '../../components/validator';

const ProfileScreen = ({navigation}) => {
  const {userToken, user, setUser} = useContext(AppContext);

  const [errorMessage, setErrorMessage] = useState({
    email: false,
    first_name: false,
    last_name: false,
  });
  const [updateFlag, setUpdateFlag] = useState(false);
  const [showEditButton, setShowEditButton] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [tempUser, setTempUser] = useState(user || {});

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        showEditButton && (
          <TouchableOpacity onPress={onPressEditProfile}>
            <Image
              style={styles.image}
              source={require('../../assets/edit.png')}
            />
          </TouchableOpacity>
        ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showEditButton]);

  const showToast = responseData => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(responseData, ToastAndroid.SHORT);
    }
  };

  const updateField = fieldKey => fieldValue => {
    setTempUser(old => ({
      ...old,
      [fieldKey]: fieldValue,
    }));
  };

  const onPressEditProfile = () => {
    setUpdateFlag(true);
    setShowEditButton(false);
  };

  const handleUpdate = () => {
    setUpdateFlag(false);
    setShowEditButton(true);
  };

  const updateProfile = async () => {
    setIsModalVisible(true);
    try {
      const response = await axios.patch(
        `${BASE_URL}/update-profile`,
        tempUser,
        {
          headers: {
            'Content-type': 'application/json',
            Authorization: 'Bearer '.concat(userToken),
          },
        },
      );
      setIsModalVisible(false);
      showToast('Profile Successfully Updated');
      setUser(response.data);
    } catch (error) {
      console.log({error});
      setIsModalVisible(false);
      if (error?.response?.status === 401) {
        showToast('Unauthorized');
      } else if (error?.response?.status === 500) {
        showToast('Internal server error');
      } else {
        showToast('Network error');
      }
    }
  };

  const validateAndUpdateProfile = () => {
    let count = 0;
    for (let key in errorMessage) {
      let validationResponse = validate(key, tempUser[key]);
      console.log(tempUser.email);
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
      updateProfile();
      handleUpdate();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ModalView visible={isModalVisible} />
      <View style={styles.formFieldsContainer}>
        <InputText
          placeholder={'First Name'}
          onChangeText={updateField('first_name')}
          value={tempUser.first_name}
          error={errorMessage.first_name}
          editable={updateFlag}
          autoCapitalize={'words'}
        />
        <ErrorMessage message={errorMessage.first_name} />
        <InputText
          placeholder={'Last Name'}
          onChangeText={updateField('last_name')}
          value={tempUser.last_name}
          error={errorMessage.last_name}
          editable={updateFlag}
          autoCapitalize={'words'}
        />
        <ErrorMessage message={errorMessage.last_name} />
        <InputText
          placeholder={'Email'}
          onChangeText={updateField('email')}
          value={tempUser.email}
          error={errorMessage.email}
          editable={updateFlag}
          keyboardType={'email-address'}
        />
        <ErrorMessage message={errorMessage.email} />
        {updateFlag && (
          <Button
            onPress={validateAndUpdateProfile}
            textColor={'white'}
            text={'Update'}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 12,
  },
  formFieldsContainer: {
    flex: 1,
    alignSelf: 'stretch',
    marginHorizontal: 12,
  },
});

export default ProfileScreen;
