import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { globalStyles } from '../../styles/global';

const StoreScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={globalStyles.container}>
        <Text>Store</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default StoreScreen;
