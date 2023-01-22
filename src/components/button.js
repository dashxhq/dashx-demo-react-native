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
  size,
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
      <Text style={{...styles.text, color: textColor, fontSize: size}}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
  },
});

export default Button;
