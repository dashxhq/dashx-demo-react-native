import {Text, View} from 'react-native';
import React from 'react';
import {globalStyles} from '../../styles/global';

const BookmarksScreen = () => {
  return (
    <View style={{flex: 1}}>
      <View style={globalStyles.Container}>
        <Text>Bookmarks</Text>
      </View>
    </View>
  );
};

export default BookmarksScreen;
