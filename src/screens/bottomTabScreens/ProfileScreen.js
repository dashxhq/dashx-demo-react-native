import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../../components/button';
import InputText from '../../components/inputText';
import ModalView from '../../components/modal';
import ShowError from '../../components/showError';
import validate from '../../components/validator';
import AppContext from '../../useContext/AppContext';
import {showToast} from '../../utils/LocalStorage';
import DocumentPicker from 'react-native-document-picker';
import {patchMethod} from '../../utils/LocalStorage';
import {getMethod} from '../../utils/LocalStorage';

const Profile = () => {
  const {userToken} = useContext(AppContext);
  const [errorMessage, setErrorMessage] = useState({
    email: false,
    first_name: false,
    last_name: false,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updateUser, setUpdateUser] = useState();
  const [image, setImage] = useState('asd');

  const getProfile = async () => {
    setIsModalVisible(true);
    const response = await getMethod({
      endUrl: 'profile',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer '.concat(userToken),
      },
    });
    if (response.status === 200) {
      setIsModalVisible(false);
      setUpdateUser(response.data.user);
    } else {
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

  useEffect(() => {
    getProfile();
  }, []);

  const updateField = fieldKey => fieldValue => {
    setUpdateUser(old => ({
      ...old,
      [fieldKey]: fieldValue,
    }));
  };

  const updateProfile = async () => {
    setIsModalVisible(true);
    const response = await patchMethod({
      endUrl: 'update-profile',
      dataObject: updateUser,
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer '.concat(userToken),
      },
    });
    if (response.status === 200) {
      setIsModalVisible(false);
      showToast('Profile Successfully Updated');
    } else {
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
      let validationResponse = validate(key, updateUser[key]);
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
    }
  };

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setImage(res[0]['uri']);
      setUpdateUser(prev => {
        return {...prev, avatar: res[0]['uri']};
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        showToast('Canceld');
      } else {
        showToast('Unknown Error');
        throw err;
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <ModalView visible={isModalVisible} />
          <View style={styles.titleView}>
            <Text style={styles.title}>Profile</Text>
          </View>
          <View style={styles.avatar}>
            <Image
              source={{
                uri: image,
              }}
              style={{width: 80, height: 80, borderRadius: 40}}
            />
            <TouchableOpacity
              onPress={selectFile}
              style={{position: 'absolute', right: 0, bottom: 0}}>
              <Image
                style={styles.imageLogo}
                source={require('../../assets/addPhoto.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.textFieldView}>
            <InputText
              onChangeText={updateField('first_name')}
              value={updateUser?.first_name}
              error={errorMessage.first_name}
              autoCapitalize={'words'}
              onFocus={() => {
                setErrorMessage(prev => {
                  return {
                    ...prev,
                    first_name: true,
                  };
                });
              }}
            />
            <ShowError message={errorMessage.first_name} />
            <InputText
              onChangeText={updateField('last_name')}
              value={updateUser?.last_name}
              error={errorMessage.last_name}
              autoCapitalize={'words'}
              onFocus={() => {
                setErrorMessage(prev => {
                  return {
                    ...prev,
                    last_name: true,
                  };
                });
              }}
            />
            <ShowError message={errorMessage.last_name} />
            <InputText
              onChangeText={updateField('email')}
              value={updateUser?.email}
              error={errorMessage.email}
              keyboardType={'email-address'}
              onFocus={() => {
                setErrorMessage(prev => {
                  return {
                    ...prev,
                    email: true,
                  };
                });
              }}
            />
            <ShowError message={errorMessage.email} />
            <Button
              onPress={() => {
                validation();
                Keyboard.dismiss();
              }}
              textColor={'white'}
              text={'Update'}
            />
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
    marginTop: 40,
  },
  titleView: {
    marginLeft: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'lightgrey',
    alignSelf: 'center',
    marginTop: 20,
  },
  imageLogo: {
    width: 30,
    height: 30,
  },
  textFieldView: {
    flex: 1,
    alignSelf: 'stretch',
    marginHorizontal: 20,
  },
});

export default Profile;
