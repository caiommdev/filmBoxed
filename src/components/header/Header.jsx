import { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import SearchBar from '../searchBar/SearchBar';
import { AuthContext } from '../../contexts/AuthContext';

function Header() {

  const { isLoggedIn, user, handleLogout } = useContext(AuthContext);
  const [showSearch, setShowSearch] = useState(false);
  const navigation = useNavigation();

  const handleLogoutClick = () => {
    handleLogout();
    navigation.navigate('Home');
  };

  const handleSearchClick = () => {
	setShowSearch(!showSearch)
  };

  const handleNavigation = (screen) => {
    if(isLoggedIn) 
      navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => handleNavigation('FilmList')}
        >
          <MaterialIcons name="movie" size={28} color="#fff" />
        </TouchableOpacity>

        <View style={styles.rightIcons}>

        {isLoggedIn ? (
          <View style={styles.userSection}>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => handleSearchClick()}
            >
              <MaterialIcons name="search" size={28} color="#fff" />
            
            </TouchableOpacity>
            <Text style={styles.username}>{user?.username}</Text>
            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={() => handleLogoutClick()}
            >
              <MaterialIcons name="logout" size={28} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => navigation.navigate('Profile')}
            >
              <MaterialIcons name="person" size={28} color="#fff" />
            </TouchableOpacity>
          </View>
        ) : null}
        </View>
      </View>
      {showSearch && <SearchBar />}
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
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  username: {
    color: '#fff',
    fontSize: 16
  }
});

export default Header;