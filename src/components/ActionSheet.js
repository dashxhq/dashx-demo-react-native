import React, {useEffect, useRef} from 'react';
import ActionSheet from 'react-native-actionsheet';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {showToast} from '../utils/LocalStorage';
import {checkStorageReadPermission} from '../utils/PermissionUtils';

export const FilePickerActionSheet = ({onPickFile}) => {
  const refActionSheet = useRef(null);
  const actions = [launchCamera, launchImageLibrary];

  useEffect(() => {
    // Start showing action sheet as soon as the ref is active
    if (refActionSheet.current) {
      refActionSheet.current.show();
    }
  }, [refActionSheet]);

  const onPressAction = async index => {
    try {
      if (await checkStorageReadPermission()) {
        const {
          assets: [imagePickerResponse],
        } = await actions[index]?.();

        onPickFile(imagePickerResponse);
      }
    } catch (error) {
      console.log('Upload error: ', error);
      showToast(`Upload asset error: ${JSON.stringify(error)}`);
    }
  };

  return (
    <ActionSheet
      ref={refActionSheet}
      title={'Choose an option'}
      options={['Camera', 'Gallery', 'Cancel']}
      cancelButtonIndex={2}
      onPress={onPressAction}
    />
  );
};
