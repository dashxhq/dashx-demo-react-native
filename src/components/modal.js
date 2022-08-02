import {Modal, Text, View} from 'react-native';

import React from 'react';

export default function ModalView({visible}) {
  return (
    <Modal visible={visible} transparent={true}>
      <View
        style={{
          backgroundColor: '#000000aa',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            alignSelf: 'stretch',
            paddingHorizontal: 10,
            paddingVertical: 8,
            marginLeft: 50,
            marginRight: 50,
            alignItems: 'center',
          }}>
          <Text
            style={{
              marginTop: 20,
              fontSize: 18,
              color: 'black',
              fontWeight: '500',
            }}>
            Loading...
          </Text>
        </View>
      </View>
    </Modal>
  );
}
