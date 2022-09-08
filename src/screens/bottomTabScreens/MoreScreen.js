import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import AppContext from '../../useContext/AppContext';

const MoreScreen = ({navigation}) => {
  const {setUser} = useContext(AppContext);

  const performLogout = () => {
    setUser();
  };

  const navigateToScreen = text => {
    navigation.navigate(text);
  };

  return (
    <ScrollView contentContainerStyle={styles.containerView}>
      {/* // TODO Change this to use FlatList */}
      <ButtonView text="Billing" onPress={() => navigateToScreen('Billing')} />
      <ButtonView text="Profile" onPress={() => navigateToScreen('Profile')} />
      <ButtonView
        text="Settings"
        onPress={() => navigateToScreen('Settings')}
      />
      <ButtonView text="Log out" onPress={performLogout} />
    </ScrollView>
  );
};

export default MoreScreen;

const ButtonView = ({text, onPress}) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{text}</Text>
        <Image
          source={require('../../assets/disclosure.png')}
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
    paddingTop: 60,
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
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    textAlign: 'left',
    paddingVertical: 10,
    fontSize: 16,
    color: 'gray',
  },
  disclosureImageStyle: {
    height: 20,
    width: 20,
  },
});
