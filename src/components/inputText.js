import {TextInput, StyleSheet} from 'react-native';
import React from 'react';

const InputText = props => {
  const {
    placeholder,
    onChangeText,
    secureText,
    error,
    firstTextInput,
    value,
    keyboardType,
    autoCapitalize,
    onFocus,
    style,
    ...rest
  } = props;
  return (
    <TextInput
      keyboardType={keyboardType}
      secureTextEntry={secureText}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      onFocus={onFocus}
      style={{
        ...styles.textInputStyle,
        ...{borderColor: error === false || error === true ? 'grey' : 'red'},
        ...{marginTop: firstTextInput ? 0 : 20},
        ...style,
      }}
      autoCapitalize={autoCapitalize}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  textInputStyle: {
    alignSelf: 'stretch',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 12,
  },
});

export default InputText;
