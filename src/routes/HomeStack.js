import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BillingScreen from '../screens/bottomTabScreens/BillingScreen';
import ProfileScreen from '../screens/bottomTabScreens/ProfileScreen';
import SettingsScreen from '../screens/bottomTabScreens/SettingsScreen';
import TabsScreen from './TabsScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{presentation: 'card'}}>
        <Stack.Screen
          name="TabsScreen"
          component={TabsScreen}
          options={{headerShown: false, headerTitle: 'Home'}}
        />
        <Stack.Screen name="Billing" component={BillingScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default HomeStack;
