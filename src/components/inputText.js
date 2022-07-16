import {View, Text, TextInput, StyleSheet} from 'react-native';
import React, {useState} from 'react';
// import {FloatingLabelInput} from 'react-native-floating-label-input';

export default function InputText(props) {
  const {
    placeholder,
    onChangeText,
    secureText,
    error,
    firstTextInput,
    value,
    editable,
    keyboardType,
    autoCapitalize,
  } = props;
  return (
    <TextInput
      keyboardType={keyboardType}
      secureTextEntry={secureText}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      editable={editable}
      style={[
        styles.textInputStyle,
        {borderColor: error === false || error === true ? 'grey' : 'red'},
        {marginTop: firstTextInput ? 0 : 20},
      ]}
      autoCapitalize={autoCapitalize}
    />
  );
}

const styles = StyleSheet.create({
  textInputStyle: {
    alignSelf: 'stretch',
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
});
