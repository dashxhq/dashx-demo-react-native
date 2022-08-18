import {
  BUTTON_BACKGROUND_COLOR_PRIMARY,
  globalStyles,
} from '../../styles/global';
import {
  Alert,
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DashX from '@dashx/react-native';
import DocumentPicker from 'react-native-document-picker';
import {launchImageLibrary} from 'react-native-image-picker';

const HomeScreen = () => {
  const [fileUploadInProgress, setFileUploadProgress] = useState(false);

  const showToast = text => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(text, ToastAndroid.SHORT);
    } else {
      Alert.alert('DashX', text);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await DashX.configure({
          baseURI: 'https://api.dashx-staging.com/graphql',
          targetEnvironment: 'staging',
          publicKey: 'TLy2w3kxf8ePXEyEjTepcPiq',
        });
        // const dashXToken = await getStoredValueForKey('dashXToken');
      } catch (e) {
        showToast(`DashX configuration error: ${JSON.stringify(e)}`);
      }
    })();
  }, []);

  const selectFile = async () => {
    try {
      const checkPermission = async () => {
        if (Platform.OS === 'android') {
          const storageReadPermissionStatus = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          );

          return storageReadPermissionStatus === 'granted';
        } else {
          //TODO Does iOS need runtime permission too? Incorporate in that case.
          return true;
        }
      };

      if (await checkPermission()) {
        const {
          assets: [imagePickerResponse],
        } = await launchImageLibrary();

        setFileUploadProgress(true);
        const response = await DashX.uploadExternalAsset(
          imagePickerResponse,
          'e8b7b42f-1f23-431c-b739-9de0fba3dadf',
        );

        showToast('Asset uploaded');
      }
    } catch (error) {
      if (!DocumentPicker.isCancel(error)) {
        console.log(error);
        showToast(`Upload asset error: ${JSON.stringify(error)}`);
      }
    } finally {
      setFileUploadProgress(false);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <View style={globalStyles.Container}>
        <Text>Home</Text>
        <TouchableOpacity
          onPress={selectFile}
          style={{
            ...styles.uploadButton,
            ...(fileUploadInProgress && styles.uploadButtonDisabled),
          }}
          disabled={fileUploadInProgress}>
          <Image
            style={styles.uploadImage}
            source={require('../../assets/upload.png')}
          />
          <Text style={styles.uploadText}>
            {fileUploadInProgress ? 'Uploading' : 'Upload'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {flex: 1},
  uploadText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
    marginRight: 10,
  },
  uploadImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  uploadButton: {
    marginTop: 20,
    backgroundColor: BUTTON_BACKGROUND_COLOR_PRIMARY,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploadButtonDisabled: {
    opacity: 0.5,
  },
});

export default HomeScreen;
