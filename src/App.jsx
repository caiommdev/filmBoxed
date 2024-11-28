import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import styles from './styles';
import ColourPalet from './AppColours/ColourPalete';
import Login from './pages/login/Login';
import Header from './components/header/Header';
import FilmList from './pages/FilmList';
import FilmList2 from './pages/FilmList2';
import FilmDetails from './pages/FilmDetails';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (email) => {
    const user = email.split('@')[0];
    setUsername(user);
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
      <ScrollView style={styles.scrollbar}>
        <View style={styles.body}>
          <Text style={styles.global}>Hello, World!</Text>
          <View style={containerStyle.container}>
            <Header
              isLoggedIn={isLoggedIn}
              username={username}
              onLoginClick={() => setShowLogin(true)}
              onLogoutClick={handleLogout}
            />
            <Stack.Navigator>
              <Stack.Screen name="FilmList" component={FilmList} />
              <Stack.Screen name="FilmList2" component={FilmList2} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="FilmDetails" component={FilmDetails} />
            </Stack.Navigator>
          </View>
        </View>
      </ScrollView>
    </NavigationContainer>
  );
}

const containerStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColourPalet.primary,
    color: ColourPalet.text,
    minHeight: '100vh',
  },
});


