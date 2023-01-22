import React from 'react';
import {View, Modal, StyleSheet, ActivityIndicator} from 'react-native';

const ModalView = ({visible}) => {
  return (
    <Modal visible={visible} transparent={true} statusBarTranslucent>
      <View style={styles.container}>
        <ActivityIndicator color={'white'} size="small" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    opacity: 0.75,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ModalView;
