import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import AppContext from '../../useContext/AppContext';
import Button from '../../components/Button';
import { CreatePostModal } from '../../components/CreatePost';
import { getAllPosts } from '../../utils/ApiClient';
import { PostsList } from '../../components/Post';
import { RefreshIndicatorView } from '../../components/RefreshIndicatorView';

const HomeScreen = () => {
  const { userToken, posts, setPosts } = useContext(AppContext);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [showDataRefreshView, setShowDataRefreshView] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      if (isFocused) {
        setShowDataRefreshView(true);
        setPosts(await getAllPosts(userToken));
        setShowDataRefreshView(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  const didBeginToggleBookmark = async (item) => {
    // Optimistically update posts
    setPosts((oldPosts) =>
      oldPosts.map((post) => (post.id === item.id ? item : post)),
    );
  };

  const didFinishToggleBookmark = async (item, errorOccurred) => {
    // Update the posts in case of error to revert to previous state
    if (errorOccurred) {
      setPosts((oldPosts) =>
        oldPosts.map((post) => (post.id === item.id ? item : post)),
      );
    }
  };

  const dismissCreatePostModal = async (postCreated) => {
    setShowCreatePostModal(false);

    if (postCreated) {
      setShowDataRefreshView(true);
      setPosts(await getAllPosts(userToken));
      setShowDataRefreshView(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {showCreatePostModal && (
        <CreatePostModal dismissModal={dismissCreatePostModal} />
      )}
      <View style={styles.titleView}>
        <Text style={styles.titleText}>Posts</Text>
        <Button
          onPress={() => {
            setShowCreatePostModal(true);
          }}
          textColor={'white'}
          text={'Add Post'}
          size={16}
        />
      </View>
      {showDataRefreshView && <RefreshIndicatorView />}
      <View style={{ flex: 1 }}>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PostsList
              item={item}
              didBeginToggleBookmark={didBeginToggleBookmark}
              didFinishToggleBookmark={didFinishToggleBookmark}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleView: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  titleText: {
    fontSize: 24,
    color: 'black',
    fontWeight: '700',
  },
});

export default HomeScreen;
