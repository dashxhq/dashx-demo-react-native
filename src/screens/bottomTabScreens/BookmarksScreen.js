import React from 'react';
import {globalStyles} from '../../styles/global';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const BookmarksScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={globalStyles.Container}>
        <Text>Bookmarks</Text>
      </View>
    </SafeAreaView>
  );
};

export default BookmarksScreen;
