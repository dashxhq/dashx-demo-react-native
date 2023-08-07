import DashX from '@dashx/react-native';
import React, { useEffect, useState } from 'react';
import { Text, View, Switch, StyleSheet } from 'react-native';

import Button from '../../components/Button';
import ModalView from '../../components/Modal';
import { showToast } from '../../utils/LocalStorage';

const Settings = () => {
  const [createPostEnable, setCreatePostEnable] = useState(false);
  const [createBookmarksEnable, setCreateBookmarksEnable] = useState(false);
  const [bookmarks, setBookmarks] = useState(false);
  const [posts, setPosts] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    (async () => {
      setVisible(true);
      const response = await DashX.fetchStoredPreferences();
      setCreateBookmarksEnable(response['new-bookmark'].enabled);
      setCreatePostEnable(response['new-post'].enabled);
      setBookmarks(response['new-bookmark'].enabled);
      setPosts(response['new-post'].enabled);
      setVisible(false);
    })();
  }, []);

  const toggleSwitch = (text) => {
    if (text === 'createPost') {
      setCreatePostEnable((previousState) => !previousState);
    } else {
      setCreateBookmarksEnable((previousState) => !previousState);
    }
  };

  const handleSave = async () => {
    if (bookmarks !== createBookmarksEnable || posts !== createPostEnable) {
      setVisible(true);
      await DashX.saveStoredPreferences({
        'new-bookmark': { enabled: createBookmarksEnable },
        'new-post': { enabled: createPostEnable },
      });
      setBookmarks(createBookmarksEnable);
      setPosts(createPostEnable);
      setVisible(false);
      showToast('Preferences Saved');
    } else {
    }
  };

  const handleCancel = () => {
    setCreateBookmarksEnable(bookmarks);
    setCreatePostEnable(posts);
  };

  return (
    <View style={styles.container}>
      <ModalView visible={visible} />
      <View style={styles.bookmarksAndPostView}>
        <View style={{ flex: 9 }}>
          <Text style={styles.titleText}>When someone creates a post</Text>
          <Text style={styles.subtitleText}>
            This will send a notification when someone creates a post
          </Text>
        </View>
        <View style={styles.toggle}>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            onValueChange={() => toggleSwitch('createPost')}
            value={createPostEnable}
          />
        </View>
      </View>
      <View style={styles.horizontalLine} />
      <View style={styles.bookmarksAndPostView}>
        <View style={{ flex: 9 }}>
          <Text style={styles.titleText}>When someone bookmarks a post</Text>
          <Text style={styles.subtitleText}>
            This will send a notification when someone bookmarks a post
          </Text>
        </View>
        <View style={styles.toggle}>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            onValueChange={() => toggleSwitch('createBookmarks')}
            value={createBookmarksEnable}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginTop: 20,
        }}
      >
        <Button
          onPress={handleCancel}
          text={'Cancel'}
          textColor={'black'}
          backgroundColor={'white'}
          size={20}
          style={{
            marginRight: 25,
            shadowColor: 'grey',
            elevation: 5,
            paddingHorizontal: 20,
          }}
        />
        <Button
          onPress={handleSave}
          text={'Save'}
          textColor={'white'}
          size={20}
          style={{
            marginRight: 20,
            shadowColor: 'grey',
            elevation: 5,
            paddingHorizontal: 20,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bookmarksAndPostView: {
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    color: 'black',
    paddingBottom: 5,
  },
  subtitleText: {
    fontSize: 17,
    lineHeight: 23,
  },
  toggle: {
    marginLeft: 35,
    flex: 1,
  },
  horizontalLine: {
    marginHorizontal: 10,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderColor: 'black',
  },
});

export default Settings;
