import {
  BUTTON_BACKGROUND_COLOR_PRIMARY,
  globalStyles,
} from '../../styles/global';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';

import DashX from '@dashx/react-native';
import DocumentPicker from 'react-native-document-picker';
import {getStoredValueForKey} from '../../utils/LocalStorage';

const HomeScreen = () => {
  const showToast = text => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(text, ToastAndroid.SHORT);
    } else {
      console.log('Message: ', text);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await DashX.setup({
          baseUri: 'https://api.dashx-staging.com/graphql',
          targetEnvironment: 'staging',
          publicKey: 'TLy2w3kxf8ePXEyEjTepcPiq',
        });
        const id = (await getStoredValueForKey('user')).id;
        const identityToken = await getStoredValueForKey('userToken');

        // Send identify request
        await DashX.identify({
          uid: `${id}`,
        });

        DashX.setIdentityToken(identityToken);
      } catch (e) {
        console.log('DashX configuration error: ', e);
        showToast(`DashX configuration error: ${JSON.stringify(e)}`);
      }
    })();
  }, []);

  const selectFile = async () => {
    try {
      const pickerResponse = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });

      const response = await DashX.uploadExternalAsset(
        pickerResponse,
        //TODO Remove hardcoding of column id
        'e8b7b42f-1f23-431c-b739-9de0fba3dadf',
      );

      console.log('External asset uploaded: ', response);
    } catch (error) {
      if (!DocumentPicker.isCancel(error)) {
        console.log(error);
        showToast(`Upload asset error: ${JSON.stringify(error)}`);
      }
    }
  };

  return (
    <View style={styles.screenContainer}>
      <View style={globalStyles.Container}>
        <Text>Home</Text>
        <TouchableOpacity onPress={selectFile} style={styles.uploadButton}>
          <Image
            style={styles.uploadImage}
            source={require('../../assets/upload.png')}
          />
          <Text style={styles.uploadText}>Upload</Text>
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
});

export default HomeScreen;
