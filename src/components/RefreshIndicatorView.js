import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

export const RefreshIndicatorView = ({style = {}}) => {
  return (
    <View style={{...styles.container, ...style}}>
      <ActivityIndicator size="small" color="black" />
      <Text style={styles.refreshingText}>Refreshing...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'lightgray',
    position: 'absolute',
    paddingVertical: 5,
    bottom: 0,
    left: 0,
    zIndex: 10,
  },
  refreshingText: {
    color: 'black',
    marginLeft: 10,
    fontSize: 17,
  },
});
