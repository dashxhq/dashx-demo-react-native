import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext } from 'react';
import AppContext from '../../useContext/AppContext';
import DashX from '@dashx/react-native';

const MoreScreen = ({ navigation }) => {
  const { setUser } = useContext(AppContext);

  const performLogout = () => {
    DashX.unsubscribe();
    setUser();
  };

  const navigateToScreen = (text) => {
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

const ButtonView = ({ text, onPress }) => {
  return (
    <View style={styles.buttonContainer}>
      <View style={{ marginHorizontal: 20 }}>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
      </View>
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
    borderRadius: 5,
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
