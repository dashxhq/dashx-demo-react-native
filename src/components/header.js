import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';

export default function Header({title}) {
  return (
    <View
      style={{
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <View style={{flexDirection: 'row', marginTop: 50}}>
        <Image
          style={styles.logo}
          source={require('../assets/dashXLogo.png')}
        />
        <Text
          style={{
            fontSize: 25,
            color: 'black',
            fontWeight: 'bold',
          }}>
          Demo App
        </Text>
      </View>
      <Text
        style={{
          fontSize: 20,
          color: 'black',
          fontWeight: 'bold',
        }}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    marginRight: 20,
    width: 35,
    height: 35,
  },
});
