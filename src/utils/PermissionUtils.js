import { PermissionsAndroid, Platform } from 'react-native';

export const checkStorageReadPermission = async () => {
  // Android 13+ pickers need no storage permission, and READ_EXTERNAL_STORAGE
  // can no longer be granted there.
  if (Platform.OS === 'android' && Platform.Version < 33) {
    const storageReadPermissionStatus = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );

    return storageReadPermissionStatus === 'granted';
  } else {
    //TODO Does iOS need runtime permission too? Incorporate in that case.
    return true;
  }
};
