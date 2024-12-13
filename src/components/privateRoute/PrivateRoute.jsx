import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function PrivateRoute({ isLoggedIn, children }) {
  const navigation = useNavigation();

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.replace('Login');
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return null;
  }

  return <View style={{flex: 1}}>{children}</View>;
}

export default PrivateRoute;