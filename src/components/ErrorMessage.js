import {Text} from 'react-native';
import React from 'react';

export default function ErrorMessage({message}) {
  return (
    typeof message === 'string' &&
    !!message && <Text style={{marginLeft: 10, color: 'red'}}>{message}</Text>
  );
}
