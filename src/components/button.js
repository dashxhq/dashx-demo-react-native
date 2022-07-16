import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { BUTTON_BACKGROUND_COLOR_PRIMARY } from '../styles/global';

export default function Button({
  onPress,
  backgroundColor,
  textColor,
  text,
  borderColor,
  borderWidth,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignItems: 'center',
        backgroundColor: backgroundColor || BUTTON_BACKGROUND_COLOR_PRIMARY,
        borderRadius: 5,
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderColor: borderColor,
        borderWidth: borderWidth,
      }}>
      <Text
        style={{
          color: textColor,
          fontSize: 16,
          fontWeight: '500',
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
