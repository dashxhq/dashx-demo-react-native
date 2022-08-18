import {ActivityIndicator, Modal, View} from 'react-native';

import React from 'react';

export default function ModalView({visible}) {
  return (
    <Modal visible={visible} transparent={true} statusBarTranslucent>
      <View
        style={{
          backgroundColor: 'black',
          opacity: 0.75,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator color={'white'} size="small" />
      </View>
    </Modal>
  );
}
