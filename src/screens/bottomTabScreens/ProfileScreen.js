import DashX from '@dashx/react-native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  LogBox,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {FilePickerActionSheet} from '../../components/ActionSheet';
import Button from '../../components/Button';
import InputText from '../../components/InputText';
import ModalView from '../../components/Modal';
import ShowError from '../../components/showError';
import validate from '../../components/validator';
import {APIGet, APIPatch, EXTERNAL_COLUMN_ID} from '../../utils/ApiClient';
import {showToast} from '../../utils/LocalStorage';

const Profile = ({navigation}) => {
  const [errorMessage, setErrorMessage] = useState({
    email: false,
    first_name: false,
    last_name: false,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [user, setUser] = useState();
  const [avatarImage, setAvatarImage] = useState();
  const [fileUploadInProgress, setFileUploadProgress] = useState(false);
  const [displayActionSheet, setDisplayActionSheet] = useState(false);

  const getProfile = async () => {
    setIsModalVisible(true);

    const response = await APIGet({
      endUrl: 'profile',
    });
    setUser(response.user);

    setIsModalVisible(false);
  };

  useEffect(() => {
    getProfile();
    LogBox.ignoreLogs([
      'Animated: `useNativeDriver`',
      'componentWillReceiveProps',
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateField = fieldKey => fieldValue => {
    setUser(old => ({
      ...old,
      [fieldKey]: fieldValue,
    }));
  };

  const updateProfile = async () => {
    setIsModalVisible(true);

    await APIPatch({
      endUrl: 'update-profile',
      dataObject: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        avatar: {url: user.avatar.url},
      },
      setIsModalVisible,
    });

    setIsModalVisible(false);

    showToast('Profile Successfully Updated');
    navigation.goBack();
  };

  const validation = () => {
    let count = 0;
    for (let key in errorMessage) {
      let validationResponse = validate(key, user[key]);
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

  const onPickAvatarImage = async pickedImage => {
    setAvatarImage(pickedImage.uri);
    setDisplayActionSheet(false);
    setFileUploadProgress(true);

    try {
      const response = await DashX.uploadExternalAsset(
        pickedImage,
        EXTERNAL_COLUMN_ID.avatar,
      );

      setFileUploadProgress(false);

      setUser(oldUser => ({...(oldUser || {}), avatar: response?.data?.asset}));

      showToast('Asset uploaded');
    } catch (error) {
      showToast(error.message);
    }
  };

  const onPressAvatarButton = async () => {
    setDisplayActionSheet(true);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <ModalView visible={isModalVisible} />
        {displayActionSheet && (
          <FilePickerActionSheet
            onPickFile={onPickAvatarImage}
            setDisplayActionSheet={setDisplayActionSheet}
            mediaType="image"
          />
        )}
        <AvatarView
          avatarImage={avatarImage || user?.avatar?.url}
          onPress={onPressAvatarButton}
          showLoader={fileUploadInProgress}
          disabled={fileUploadInProgress}
        />
        <View style={styles.textFieldView}>
          <InputText
            onChangeText={updateField('first_name')}
            value={user?.first_name}
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
            value={user?.last_name}
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
            value={user?.email}
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
            disabled={fileUploadInProgress}
            style={styles.updateButton}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const AvatarView = ({avatarImage, onPress, showLoader, ...rest}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.avatar} {...rest}>
      <Image
        source={{
          uri: avatarImage,
        }}
        style={styles.avatarImage}
      />
      {!avatarImage && (
        <View style={styles.imageLogoContainer}>
          <Image
            style={styles.imageLogo}
            source={require('../../assets/addPhoto.png')}
          />
        </View>
      )}
      {showLoader && (
        <ActivityIndicator
          size="small"
          color="white"
          style={styles.avatarActivityIndicator}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  updateButton: {
    marginTop: 20,
    paddingVertical: 15,
  },
  textFieldView: {
    flex: 1,
    alignSelf: 'stretch',
    marginHorizontal: 20,
  },

  // Avatar image
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'lightgray',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    elevation: 5,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  imageLogo: {
    width: 30,
    height: 30,
  },
  imageLogoContainer: {
    position: 'absolute',
    height: 30,
    width: 30,
  },
  avatarActivityIndicator: {
    position: 'absolute',
    verticalAlign: 'middle',
    alignSelf: 'center',
  },
});

export default Profile;
