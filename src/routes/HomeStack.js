import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BillingScreen from '../screens/bottomTabScreens/BillingScreen';
import ProfileScreen from '../screens/bottomTabScreens/ProfileScreen';
import SettingsScreen from '../screens/bottomTabScreens/SettingsScreen';
import Tabs from '../routes/tabs';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Billing"
          component={BillingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{headerShown: false}}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default HomeStack;
