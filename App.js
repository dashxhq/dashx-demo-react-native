import React, { useEffect, useMemo, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox, StatusBar } from 'react-native';
import DashX from '@dashx/react-native';

import HomeStack from './src/routes/HomeStack';
import Navigator from './src/routes/loginStack';
import AppContext from './src/useContext/AppContext';
import {
  getStoredValueForKey,
  storeValueForKey,
} from './src/utils/LocalStorage';

DashX.configure({
  baseURI: 'https://api.dashx-staging.com/graphql',
  targetEnvironment: 'staging',
  publicKey: 'ft3tP2wJlQB5NSdYrjU8UylH',
});

function App() {
  const [isProcessed, setIsProcessed] = useState(false);
  const [posts, setPosts] = useState([]);

  const [user, updateUser] = useState();
  const [userToken, updateUserToken] = useState('');
  const [, updateDashXToken] = useState('');
  const isLoggedIn = useMemo(() => !!user, [user]);

  const setDashXToken = (token) => {
    storeValueForKey('dashXToken', token);
    updateDashXToken(token);
  };

  const setUserToken = (token) => {
    storeValueForKey('userToken', token);
    updateUserToken(token);
  };

  const setUser = (localUser) => {
    storeValueForKey('user', localUser ? JSON.stringify(localUser) : null);
    updateUser(localUser);
  };

  useEffect(() => {
    (async () => {
      const storedUserToken = await getStoredValueForKey('userToken');
      const storedUser = await getStoredValueForKey('user');
      updateUser(storedUser);
      setUserToken(storedUserToken);
      setIsProcessed(true);
    })();
    LogBox.ignoreAllLogs();
  }, []);

  return (
    <AppContext.Provider
      value={{
        userToken,
        setUserToken,
        user,
        setUser,
        setDashXToken,
        posts,
        setPosts,
      }}
    >
      <NavigationContainer>
        <StatusBar
          translucent
          backgroundColor={'black'}
          barStyle="light-content"
        />
        {isProcessed && isLoggedIn && <HomeStack />}
        {isProcessed && !isLoggedIn && <Navigator />}
      </NavigationContainer>
    </AppContext.Provider>
  );
}

export default App;
