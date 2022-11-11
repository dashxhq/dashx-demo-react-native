import React from 'react';
import {Image, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/bottomTabScreens/HomeScreen';
import StoreScreen from '../screens/bottomTabScreens/StoreScreen';
import BookmarksScreen from '../screens/bottomTabScreens/BookmarksScreen';
import MoreScreen from '../screens/bottomTabScreens/MoreScreen';
import {BUTTON_BACKGROUND_COLOR_PRIMARY} from '../styles/global';

const TabNavigator = createBottomTabNavigator();

const Tabs = () => {
  return (
    <TabNavigator.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          borderRightColor: '#E8E8E8',
          borderRightWidth: 1,
          paddingBottom: Platform.select({ios: 0, android: 5}),
        },
        tabBarActiveTintColor: BUTTON_BACKGROUND_COLOR_PRIMARY,
      }}>
      <TabNavigator.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={require('../assets/home.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  tintColor: focused ? BUTTON_BACKGROUND_COLOR_PRIMARY : null,
                }}
              />
            );
          },
        }}
      />
      <TabNavigator.Screen
        name="Store"
        component={StoreScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={require('../assets/store.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  tintColor: focused ? BUTTON_BACKGROUND_COLOR_PRIMARY : null,
                }}
              />
            );
          },
        }}
      />
      <TabNavigator.Screen
        name="Bookmarks"
        component={BookmarksScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={require('../assets/outLinedBookmark.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  tintColor: focused ? BUTTON_BACKGROUND_COLOR_PRIMARY : null,
                }}
              />
            );
          },
        }}
      />
      <TabNavigator.Screen
        name="More"
        component={MoreScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={require('../assets/more.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  tintColor: focused ? BUTTON_BACKGROUND_COLOR_PRIMARY : null,
                }}
              />
            );
          },
        }}
      />
    </TabNavigator.Navigator>
  );
};

export default Tabs;
