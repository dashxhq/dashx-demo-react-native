import {Text, View} from 'react-native';
import React from 'react';
import {globalStyles} from '../../styles/global';

const StoreScreen = () => {
  return (
    <View style={{flex: 1}}>
      <View style={globalStyles.Container}>
        <Text>Store</Text>
      </View>
    </View>
  );
};

export default StoreScreen;
