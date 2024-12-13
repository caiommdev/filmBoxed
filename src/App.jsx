import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import styles from './styles';
import ColourPalet from './AppColours/ColourPalete';
import Login from './screens/login/Login';
import Header from './components/header/Header';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import FilmList from './screens/FilmList';
import FilmDetails from './screens/FilmDetails';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Home from './screens/Home';
import SignUp from './screens/SignUp';
import Profile from './screens/Profile';
import { AuthContext } from './contexts/AuthContext';

const Stack = createStackNavigator();

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
  
    const handleLogin = async (user) => {
      setUser(user);
      setIsLoggedIn(true);
      return true;
    };
  
    const handleLogout = () => {
      setUser(null);
      setIsLoggedIn(false);
    };
  
    return (
        <AuthContext.Provider value={{ isLoggedIn, user, handleLogin, handleLogout }}>
            <NavigationContainer>
                <GestureHandlerRootView style={{flex:1}}>
                    <View style={styles.body}>
                        <View style={X.container}>
                            <Header/>
                            <View style={{ flex: 1, width: '100%' }}>
                                <Stack.Navigator 
                                screenOptions={{ headerShown: false }}
                                initialRouteName="Home"
                                >
                                    <Stack.Screen name="Home" component={Home} />
                                    <Stack.Screen name="SignUp" component={SignUp}/>
                                    <Stack.Screen name="Login" component={Login}/>
                                    <Stack.Screen 
                                        name="FilmList" 
                                        children={({route}) => (
                                            <PrivateRoute isLoggedIn={isLoggedIn}>
                                                <FilmList route={route} />
                                            </PrivateRoute>
                                        )} 
                                    />
                                    <Stack.Screen 
                                        name="FilmDetails" 
                                        children={({route, navigation}) => (
                                            <PrivateRoute isLoggedIn={isLoggedIn}>
                                                <FilmDetails route={route} navigation={navigation} />
                                            </PrivateRoute>
                                        )} 
                                    />
                                    <Stack.Screen 
                                        name="Profile" 
                                        children={({route, navigation}) => (
                                            <PrivateRoute isLoggedIn={isLoggedIn}>
                                                <Profile 
                                                    route={route} 
                                                    navigation={navigation}
                                                    username={user?.username} 
                                                    email={user?.email} 
                                                />
                                            </PrivateRoute>
                                        )} 
                                    />
                                </Stack.Navigator>
                            </View>
                        </View>
                    </View>
                </GestureHandlerRootView>
            </NavigationContainer>
    </AuthContext.Provider>
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


