import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

function Header({ isLoggedIn, username, onLoginClick, onLogoutClick }) {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => navigation.navigate('FilmList')}
        >
          <MaterialIcons name="movie" size={28} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.logo}>Film Boxed</Text>

        {isLoggedIn ? (
          <TouchableOpacity style={styles.iconButton} onPress={onLogoutClick}>
            <MaterialIcons name="account-circle" size={28} color="#fff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.iconButton} onPress={onLoginClick}>
            <MaterialIcons name="login" size={28} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#1D1D1D',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1D1D1D',
    paddingVertical: 15,
    paddingHorizontal: 20,
    paddingTop: 50,
    width: '100%',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  logo: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
  iconButton: {
    padding: 10,
  }
});

export default Header;