import {View, Text} from 'react-native';
import React from 'react';

export default function ShowError({message}) {
  return message === false || message === true ? (
    <View></View>
  ) : (
    <Text style={{marginLeft: 10, color: 'red'}}>{message}</Text>
  );
}
