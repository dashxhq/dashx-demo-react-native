import AppContext from './src/useContext/AppContext';
import React, {useEffect, useMemo, useState} from 'react';
import {getStoredValueForKey, storeValueForKey} from './src/utils/LocalStorage';
import HomeStack from './src/routes/HomeStack';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './src/routes/LoginStack';
import {StatusBar} from 'react-native';

function App() {
  const [isProcessed, setIsProcessed] = useState(false);

  const [user, updateUser] = useState();
  const [userToken, updateUserToken] = useState('');
  const [, updateDashXToken] = useState('');
  const isLoggedIn = useMemo(() => !!user, [user]);

  const setDashXToken = token => {
    storeValueForKey('dashXToken', token);
    updateDashXToken(token);
  };

  const setUserToken = token => {
    storeValueForKey('userToken', token);
    updateUserToken(token);
  };

  const setUser = localUser => {
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
  }, []);

  return (
    <AppContext.Provider
      value={{
        userToken,
        setUserToken,
        user,
        setUser,
        setDashXToken,
      }}>
      <NavigationContainer>
        <StatusBar translucent backgroundColor={'white'} />
        {isProcessed && isLoggedIn && <HomeStack />}
        {isProcessed && !isLoggedIn && <Navigator />}
      </NavigationContainer>
    </AppContext.Provider>
  );
}

export default App;
