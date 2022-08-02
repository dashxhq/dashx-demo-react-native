import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/bottomTabScreens/HomeScreen';
import StoreScreen from '../screens/bottomTabScreens/StoreScreen';
import BookmarksScreen from '../screens/bottomTabScreens/BookmarksScreen';
import MoreScreen from '../screens/bottomTabScreens/MoreScreen';

const TabNavigator = createBottomTabNavigator();

const TabsScreen = () => {
  return (
    <TabNavigator.Navigator
      screenOptions={{
        tabBarIconStyle: {display: 'none'},
        tabBarLabelStyle: {
          fontSize: 16,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          borderRightColor: 'lightgray',
        },
      }}>
      <TabNavigator.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <TabNavigator.Screen
        name="Store"
        component={StoreScreen}
        options={{headerShown: false}}
      />
      <TabNavigator.Screen
        name="Bookmarks"
        component={BookmarksScreen}
        options={{headerShown: false}}
      />
      <TabNavigator.Screen
        name="More"
        component={MoreScreen}
        options={{headerShown: false}}
      />
    </TabNavigator.Navigator>
  );
};

export default TabsScreen;
