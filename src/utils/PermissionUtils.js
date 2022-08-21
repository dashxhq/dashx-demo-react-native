import {PermissionsAndroid, Platform} from 'react-native';

export const checkStorageReadPermission = async () => {
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
