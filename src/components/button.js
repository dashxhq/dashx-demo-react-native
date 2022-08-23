import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {BUTTON_BACKGROUND_COLOR_PRIMARY} from '../styles/global';

const Button = ({
  onPress,
  backgroundColor,
  textColor,
  text,
  borderColor,
  borderWidth,
  style = {},
  disabled,
  ...rest
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        ...styles.container,
        backgroundColor: backgroundColor || BUTTON_BACKGROUND_COLOR_PRIMARY,
        opacity: disabled ? 0.5 : 1,
        borderColor: borderColor,
        borderWidth: borderWidth,
        ...style,
      }}
      disabled={disabled}
      {...rest}>
      <Text style={{...styles.text, color: textColor}}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Button;
