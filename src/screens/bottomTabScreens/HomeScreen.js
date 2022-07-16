import React from 'react';
import {
  BUTTON_BACKGROUND_COLOR_PRIMARY,
  globalStyles,
} from '../../styles/global';
import {Text, View, TouchableOpacity, Image, ToastAndroid} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import DocumentPicker from 'react-native-document-picker';

const HomeScreen = () => {
  const showToast = responseDaata => {
    ToastAndroid.show(responseDaata, ToastAndroid.SHORT);
  };

  const selectFile = async () => {
    try {
      await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      showToast('File uploaded Succssfully');
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        showToast('Canceled');
      } else {
        console.log(error);
        showToast('Something went wrong');
      }
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={globalStyles.Container}>
        <Text>Home</Text>
        <TouchableOpacity
          onPress={selectFile}
          style={{
            marginTop: 20,
            backgroundColor: BUTTON_BACKGROUND_COLOR_PRIMARY,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            style={{width: 30, height: 30, marginRight: 10}}
            source={require('../../assets/upload.png')}
          />
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontWeight: '500',
              marginRight: 10,
            }}>
            Upload
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
