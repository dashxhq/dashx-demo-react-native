import axios from 'axios';
import React, {useContext, useState} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BASE_URL} from '../../components/APIClient';
import Button from '../../components/button';
import InputText from '../../components/inputText';
import ModalView from '../../components/modal';
import ShowError from '../../components/showError';
import validate from '../../components/validator';
import AppContext from '../../useContext/AppContext';

const Profile = () => {
  const {userToken, user, setUser} = useContext(AppContext);

  const [errorMessage, setErrorMessage] = useState({
    email: false,
    first_name: false,
    last_name: false,
  });
  const [updateFlag, setUpdateFlag] = useState(false);
  const [imageFlag, setImageFlag] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [tempUser, setTempUser] = useState(user || {});

  const showToast = responseDaata => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(responseDaata, ToastAndroid.SHORT);
    }
  };

  const updateField = fieldKey => fieldValue => {
    setTempUser(old => ({
      ...old,
      [fieldKey]: fieldValue,
    }));
  };

  const handleImage = () => {
    setUpdateFlag(true);
    setImageFlag(false);
  };

  const handleUpdate = () => {
    setUpdateFlag(false);
    setImageFlag(true);
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

  const validation = () => {
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
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <ModalView visible={isModalVisible} />
        <View style={styles.horizontalStack}>
          <View style={{alignItems: 'center', marginTop: 40}}>
            <Text style={styles.title}>Profile</Text>
          </View>
          <View style={{marginTop: 40}}>
            <TouchableOpacity onPress={handleImage}>
              {imageFlag ? (
                <Image
                  style={styles.image}
                  source={require('../../assets/edit.png')}
                />
              ) : null}
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            alignSelf: 'stretch',
            marginLeft: 20,
            marginRight: 20,
          }}>
          <InputText
            placeholder={'First Name'}
            onChangeText={updateField('first_name')}
            value={tempUser.first_name}
            error={errorMessage.first_name}
            editable={updateFlag}
            autoCapitalize={'words'}
          />
          <ShowError message={errorMessage.first_name} />
          <InputText
            placeholder={'Last Name'}
            onChangeText={updateField('last_name')}
            value={tempUser.last_name}
            error={errorMessage.last_name}
            editable={updateFlag}
            autoCapitalize={'words'}
          />
          <ShowError message={errorMessage.last_name} />
          <InputText
            placeholder={'Email'}
            onChangeText={updateField('email')}
            value={tempUser.email}
            error={errorMessage.email}
            editable={updateFlag}
            keyboardType={'email-address'}
          />
          <ShowError message={errorMessage.email} />
          {updateFlag && (
            <Button onPress={validation} textColor={'white'} text={'Update'} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  horizontalStack: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    paddingRight: 15,
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default Profile;
