import React, {useState} from 'react';
import {
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {APIPost} from '../utils/ApiClient';
import {showToast} from '../utils/LocalStorage';
import Button from './Button';
import InputText from './InputText';
import ErrorMessage from './ErrorMessage';
import validate from './validator';

export const CreatePostModal = ({visible, dismissModal}) => {
  const [newPost, setNewPost] = useState('');
  const [requestInProgress, setRequestInProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    newPost: false,
  });

  const validation = () => {
    let count = 0;

    for (let key in errorMessage) {
      let validationResponse = validate(key, eval(key));
      setErrorMessage(prev => {
        return {
          ...prev,
          [key]: validationResponse,
        };
      });
      if (validationResponse !== true) {
        break;
      } else {
        count += 1;
      }
    }
    if (count === Object.keys(errorMessage).length) {
      createPost();
    }
  };

  const createPost = async () => {
    setRequestInProgress(true);
    await APIPost({
      endUrl: 'posts',
      dataObject: {text: newPost, image: null, video: null},
    });
    setRequestInProgress(false);

    showToast('Successfully Posted');

    dismissModal?.(true);

    // Reset post text
    setNewPost();
  };

  return (
    <Modal visible={visible} transparent={true}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={styles.centeredView}>
          <View style={styles.innerContainer}>
            <Text style={styles.createPost}>Create a post</Text>
            <Text style={styles.text}>Text</Text>
            <InputText
              style={styles.postTextInput}
              error={errorMessage.newPost}
              onChangeText={setNewPost}
              onFocus={() => {
                setErrorMessage(prev => {
                  return {
                    ...prev,
                    newPost: false,
                  };
                });
              }}
              multiline
              numberOfLines={3}
              editable={!requestInProgress}
            />
            <ErrorMessage message={errorMessage.newPost} />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Button
                onPress={dismissModal}
                backgroundColor={'white'}
                borderWidth={1}
                text={'Cancel'}
                textColor={'black'}
              />
              <Button
                onPress={validation}
                text={!requestInProgress ? 'Create' : 'Creating'}
                textColor={'white'}
                style={{paddingHorizontal: 23}}
                disabled={requestInProgress}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
  },
  createPost: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
  postTextInput: {
    marginBottom: 20,
    height: 60,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});
