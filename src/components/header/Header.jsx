import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

function Header({ isLoggedIn, username, onLoginClick, onLogoutClick }) {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <Text style={styles.logo}>MovieApp</Text>
      <TouchableOpacity style={styles.loginSection} onPress={() => navigation.navigate('FilmList')}>
        <Text>Filmes1</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginSection} onPress={() => navigation.navigate('FilmList2')}>
        <Text>Filmes2</Text>
      </TouchableOpacity>
      <View style={styles.loginSection}>
        {isLoggedIn ? (
          <View style={styles.username}>
            <Text>Bem-vindo, {username}</Text>
            <MaterialIcons name="logout" style={styles.logoutIcon} onPress={onLogoutClick} />
          </View>
        ) : (
          <TouchableOpacity onPress={onLoginClick}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f8f8', // substitua por var(--secondary)
    color: '#333', // substitua por var(--txtSecondary)
    padding: 10,
    maxWidth: '100vw',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  loginSection: {
    fontSize: 16,
  },
  loginLink: {
    cursor: 'pointer',
    color: '#333', // substitua por var(--txtSecondary)
    borderRadius: 20,
    padding: 10,
    fontSize: 25,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutIcon: {
    marginLeft: 10,
    cursor: 'pointer',
    color: '#333', // substitua por var(--txtSecondary)
  },
});

export default Header;