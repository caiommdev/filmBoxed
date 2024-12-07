import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import ColourPalet from '../../AppColours/ColourPalete';
import ApiService from '../../services/ApiService';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const handleSearch = async () => {
    if (searchQuery.length >= 3) {
      try {
        const results = await ApiService.searchMovies(searchQuery);
        navigation.navigate('FilmList', { 
          searchQuery: searchQuery, 
          searchResults: results.results 
        });
      } catch (error) {
        console.error('Erro na busca:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Pesquisar filme..."
          placeholderTextColor={ColourPalet.text}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity 
          style={styles.searchButton} 
          onPress={handleSearch}
        >
          <MaterialIcons name="search" size={24} color={ColourPalet.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ColourPalet.primary,
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#2D2D2D',
    color: ColourPalet.text,
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    flex: 1,
  },
  searchButton: {
    padding: 10,
    marginLeft: 10,
    backgroundColor: '#2D2D2D',
    borderRadius: 5,
  }
});

export default SearchBar;