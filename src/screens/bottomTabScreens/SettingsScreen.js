import {Text, View} from 'react-native';
import React from 'react';
import {globalStyles} from '../../styles/global';

const Settings = () => {
  return (
    <View style={{flex: 1}}>
      <View style={globalStyles.Container}>
        <Text>Settings Screen</Text>
      </View>
    </View>
  );
};

export default Settings;
