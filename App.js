import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {StatusBar} from 'react-native';
import ModalView from './src/components/modal';
import HomeStack from './src/routes/HomeStack';
import Navigator from './src/routes/loginStack';
import AppContext, {AppProvider} from './src/useContext/AppContext';
import {getStoredValueForKey, storeValueForKey} from './src/utils/LocalStorage';

function App() {
  const [isProcessed, setIsProcessed] = useState(false);

  const [user, updateUser] = useState();
  const [userToken, setUserToken] = useState('');
  const isLoggedIn = useMemo(() => !!user);

  const setUser = user => {
    storeValueForKey('user', user ? JSON.stringify(user) : null);
    updateUser(user);
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
