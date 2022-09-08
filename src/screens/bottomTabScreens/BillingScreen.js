import {Text, View} from 'react-native';
import React from 'react';
import {globalStyles} from '../../styles/global';

const Billing = () => {
  return (
    <View style={{flex: 1}}>
      <View style={globalStyles.container}>
        <Text>Billing</Text>
      </View>
    </View>
  );
};

export default Billing;
