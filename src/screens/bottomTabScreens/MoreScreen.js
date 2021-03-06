import React, {useContext} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppContext from '../../useContext/AppContext';

const MoreScreen = ({navigation}) => {
  const {setUser} = useContext(AppContext);

  const performLogout = () => {
    setUser();
  };

  const navigateToUpdateProfileScreen = () => {
    navigation.navigate('Profile');
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <View>
        {/* // TODO Change this to use FlatList */}
        <ButtonView text="Billing" />
        <ButtonView text="Profile" onPress={navigateToUpdateProfileScreen} />
        <ButtonView text="Settings" />
        <ButtonView text="Log out" onPress={performLogout} />
      </View>
    </SafeAreaView>
  );
};

export default MoreScreen;

const ButtonView = ({text, onPress}) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.textContainer}>{text}</Text>
        <Image
          source={require('../assets/disclosure.png')}
          style={styles.disclosureImageStyle}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    paddingVertical: 10,
    paddingTop: 40,
    backgroundColor: 'white',
  },
  buttonContainer: {
    marginBottom: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    textAlign: 'left',
    paddingVertical: 10,
    color: 'gray',
  },
  disclosureImageStyle: {
    height: 20,
    width: 20,
  },
});
