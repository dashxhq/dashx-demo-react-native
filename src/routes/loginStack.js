import React from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/loginScreens/LoginScreen';
import RegistrationScreen from '../screens/loginScreens/RegistrationScreen';
import ForgotPasswordScreen from '../screens/loginScreens/ForgotPasswordScreen';
import HomeStack from './HomeStack';

const Stack = createStackNavigator();
function loginStack() {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeStack"
          component={HomeStack}
          options={{headerShown: false}}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
export default loginStack;
