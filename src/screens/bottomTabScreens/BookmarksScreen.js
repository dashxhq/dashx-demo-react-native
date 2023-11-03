import { useIsFocused } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PostsList } from '../../components/Post';
import { RefreshIndicatorView } from '../../components/RefreshIndicatorView';
import { APIGet } from '../../utils/ApiClient';

const BookmarksScreen = () => {
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [showDataRefreshView, setShowDataRefreshView] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getUserBookmarks();
    }
  }, [isFocused]);

  const getUserBookmarks = async () => {
    setShowDataRefreshView(true);

    const response = await APIGet({
      endUrl: 'posts/bookmarked',
    });
    setBookmarkedPosts(response.posts);

    setShowDataRefreshView(false);
  };

  const didBeginToggleBookmark = async (item) => {
    // Optimistically update posts
    setBookmarkedPosts((oldPosts) =>
      oldPosts.filter((post) => post.id !== item.id),
    );
  };

  const didFinishToggleBookmark = async (item, errorOccurred) => {
    // Re-add the post to bookmarks in case toggle failed
    if (errorOccurred) {
      setBookmarkedPosts((oldPosts) => [...oldPosts, item]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {showDataRefreshView && <RefreshIndicatorView />}
      <View style={styles.container}>
        <View style={styles.bookmarksTitleView}>
          <Text style={styles.bookmarksTitle}>Bookmarks</Text>
        </View>
        {!showDataRefreshView && bookmarkedPosts.length === 0 ? (
          <View style={styles.bookmarksEmptyView}>
            <Image source={require('../../assets/info.png')} />
            <Text style={{ ...styles.text, color: 'black' }}>No bookmarks</Text>
            <Text style={styles.text}>Nothing to see here.</Text>
          </View>
        ) : (
          <View style={styles.bookmarksView}>
            <FlatList
              data={bookmarkedPosts}
              renderItem={({ item, index }) => (
                <PostsList
                  item={item}
                  didBeginToggleBookmark={didBeginToggleBookmark}
                  didFinishToggleBookmark={didFinishToggleBookmark}
                />
              )}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bookmarksTitleView: {
    flex: 0.1,
    justifyContent: 'center',
  },
  bookmarksTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
    paddingLeft: 20,
  },
  text: {
    color: 'grey',
    fontSize: 18,
    paddingTop: 10,
  },
  bookmarksEmptyView: {
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookmarksView: {
    flex: 0.9,
  },
});

export default BookmarksScreen;
