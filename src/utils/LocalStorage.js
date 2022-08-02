import AsyncStorage from '@react-native-async-storage/async-storage';

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
