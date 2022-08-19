import React, {useEffect, useMemo, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import HomeStack from './src/routes/HomeStack';
import Navigator from './src/routes/loginStack';
import AppContext from './src/useContext/AppContext';
import {getStoredValueForKey, storeValueForKey} from './src/utils/LocalStorage';

function App() {
  const [isProcessed, setIsProcessed] = useState(false);
  const [getPost, setGetPost] = useState({});

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

      // await DashX.configure({
      //   baseURI: 'https://api.dashx-staging.com/graphql',
      //   targetEnvironment: 'staging',
      //   publicKey: 'TLy2w3kxf8ePXEyEjTepcPiq',
      // });

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
        getPost,
        setGetPost,
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
