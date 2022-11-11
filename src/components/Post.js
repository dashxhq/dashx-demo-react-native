import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import moment from 'moment';
import {APIPut} from '../utils/ApiClient';
import Video from 'react-native-video';
import {ImageAndVideoModal} from './ImageAndVideoModal';

export const PostsList = ({
  item,
  didBeginToggleBookmark,
  didFinishToggleBookmark,
}) => {
  const [modal, setModal] = useState(false);
  const [imageOrVideoUri, setImageOrVideoUri] = useState('');

  const toggleBookmark = async () => {
    // Temporarily set the bookmarked_at field to optimistically update the UI
    const bookmarked_at = item.bookmarked_at ? null : moment().toISOString();
    didBeginToggleBookmark?.({...item, bookmarked_at});

    try {
      await APIPut({
        endUrl: `posts/${item.id}/toggle-bookmark`,
      });
      didFinishToggleBookmark?.(item);
    } catch (error) {
      // Revert to previous state
      didFinishToggleBookmark?.(item, true);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.imageView}>
            <Image
              style={styles.avatar}
              source={require('../assets/image_icon.png')}
            />
          </View>

          <View style={{flex: 0.8}}>
            <Text style={styles.nameText}>
              {item.user.first_name} {item.user.last_name}
            </Text>
            <Text style={styles.timeAgoText}>
              Posted {moment(item.created_at).fromNow()}
            </Text>
            <Text style={styles.text}>{item.text}</Text>
            <View
              style={{
                marginTop: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <ImageAndVideoModal
                visible={modal}
                setModal={setModal}
                imageOrVideoUri={imageOrVideoUri}
              />
              {item?.image?.url && (
                <TouchableOpacity
                  onPress={() => {
                    setModal(true);
                    setImageOrVideoUri({
                      mediaType: 'image',
                      uri: item?.image?.url,
                    });
                  }}>
                  <Image
                    style={{width: 70, height: 100}}
                    source={{uri: item?.image?.url}}
                  />
                </TouchableOpacity>
              )}
              {item?.video?.url && (
                <TouchableOpacity
                  onPress={() => {
                    setModal(true);
                    setImageOrVideoUri({
                      mediaType: 'video',
                      uri: item?.video?.url,
                    });
                  }}>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Video
                      style={{
                        width: 70,
                        height: 100,
                      }}
                      source={{uri: item?.video?.url}}
                    />
                    <Image
                      style={{
                        position: 'absolute',
                        tintColor: 'white',
                      }}
                      source={require('../assets/playCircle.png')}
                    />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={{flex: 0.1}}>
            <TouchableOpacity
              onPress={toggleBookmark}
              style={styles.bookmarkButton}>
              <Image
                style={styles.bookmarksLogo}
                source={
                  item.bookmarked_at === null
                    ? require('../assets/outLinedBookmark.png')
                    : require('../assets/filledBookmark.png')
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  container: {
    elevation: 2,
    backgroundColor: 'white',
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
  },
  imageView: {
    flex: 0.1,
    marginRight: 5,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  nameText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
    paddingBottom: 5,
  },
  timeAgoText: {
    fontSize: 14,
    paddingBottom: 5,
    color: 'lightGrey',
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
  bookmarksLogo: {
    height: 30,
    width: 20,
  },
  bookmarkButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
  },
});
