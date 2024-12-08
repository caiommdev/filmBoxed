import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import styles from './styles';
import ColourPalet from './AppColours/ColourPalete';
import Login from './screens/login/Login';
import Header from './components/header/Header';
import FilmList from './screens/FilmList';
import FilmDetails from './screens/FilmDetails';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Home from './screens/Home';
import SignUp from './screens/SignUp';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (username) => {
    setUsername(username);
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setUsername('');
    setIsLoggedIn(false);
    setShowLogin(false);
  };

  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{flex:1}}>
      <View style={styles.body}>
        <View style={X.container}>
          <Header
            isLoggedIn={isLoggedIn}
            username={username}
            onLogoutClick={handleLogout}
          />
          <View style={{ flex: 1, width: '100%' }}>
          <Stack.Navigator 
              screenOptions={{ headerShown: false }}
              initialRouteName="Home"
            >
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="SignUp" component={SignUp} initialParams={{ handleLogin }}/>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="FilmList" component={FilmList} />
              <Stack.Screen name="FilmDetails" component={FilmDetails} />
            </Stack.Navigator>
          </View>
        </View>
      </View>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}

const X = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColourPalet.primary,
    color: ColourPalet.text,
    minHeight: '100vh',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
});


