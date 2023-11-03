import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Platform, ToastAndroid } from 'react-native';

export const showToast = (text) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(text, ToastAndroid.SHORT);
  } else {
    Alert.alert('DashX', text);
  }
};

export const storeValueForKey = (key, value) => {
  if (value) {
    return AsyncStorage.setItem(key, value);
  } else {
    return AsyncStorage.removeItem(key);
  }
};

export const getStoredValueForKey = async (key) => {
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
