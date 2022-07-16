import {Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

export default function CheckBox({onPress, value}) {
  const [selected, setSelected] = useState(false);
  return (
    <TouchableOpacity
      style={{flexDirection: 'row', marginTop: 9}}
      onPress={() => {
        setSelected(value);
        onPress(value);
      }}>
      <Image
        style={{width: 25, height: 25}}
        source={
          selected === true
            ? require('../assets/selectBox.png')
            : require('../assets/unselectBox.png')
        }
      />
      <Text style={{marginTop: 3, marginLeft: 5, color: 'black'}}>
        Show Password
      </Text>
    </TouchableOpacity>
  );
}
