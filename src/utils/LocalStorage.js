import React, {useEffect, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../constants/APIClient';
import {Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import ActionSheet from 'react-native-actionsheet';

export const showToast = responseData => {
  ToastAndroid.show(responseData, ToastAndroid.SHORT);
};

export const storeValueForKey = (key, value) => {
  if (value) {
    AsyncStorage.setItem(key, value);
  } else {
    AsyncStorage.removeItem(key);
  }
};

export const getStoredValueForKey = async key => {
  const value = await AsyncStorage.getItem(key);
  if (value) {
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  } else {
    return value;
  }
};

export const getAllPosts = async (setIsModalVisible, setGetPost, userToken) => {
  setIsModalVisible(true);
  try {
    const response = await axios({
      method: 'get',
      url: `${BASE_URL}/posts`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    });
    setIsModalVisible(false);
    setGetPost(response.data);
  } catch (error) {
    if (error?.response?.status === 500) {
      showToast('Internal server error');
    } else {
      showToast('Network error');
    }
  }
};

export const getMethod = async ({endUrl, headers}) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${BASE_URL}/${endUrl}`,
      headers: headers,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const putMethod = async ({endUrl, headers}) => {
  try {
    const response = await axios({
      method: 'PUT',
      url: `${BASE_URL}/${endUrl}`,
      headers: headers,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const patchMethod = async ({endUrl, dataObject, headers}) => {
  try {
    const response = await axios({
      method: 'PATCH',
      url: `${BASE_URL}/${endUrl}`,
      data: JSON.stringify(dataObject),
      headers: headers,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const postmethod = async ({endUrl, dataObject, headers}) => {
  try {
    const response = await axios({
      method: 'POST',
      url: `${BASE_URL}/${endUrl}`,
      data: JSON.stringify(dataObject),
      headers: headers,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const DisplayActionSheet = ({onPress}) => {
  const refActionSheet = useRef(null);

  if (refActionSheet.current) {
    refActionSheet.current.show();
  }

  return (
    <ActionSheet
      ref={refActionSheet}
      title={'Choose a profile photo'}
      options={['camera', 'gallery', 'cancel']}
      cancelButtonIndex={2}
      destructiveButtonIndex={1}
      onPress={index => {
        if (index === 1) {
          console.log('gallery');
        } else if (index === 2) {
          console.log('canceled');
        } else {
          console.log('camera');
        }
      }}
    />
  );
  // return (
  //   <View>
  //     <ActionSheet
  //       ref={refActionSheet}
  //       title={'Choose a profile photo'}
  //       options={['camera', 'gallery', 'cancel']}
  //       cancelButtonIndex={2}
  //       destructiveButtonIndex={1}
  //       onPress={index => {
  //         if (index === 1) {
  //           console.log('gallery');
  //         } else if (index === 2) {
  //           console.log('canceled');
  //         } else {
  //           console.log('camera');
  //         }
  //       }}
  //     />
  //     {showActionSheet()}
  //   </View>
  // );
};
