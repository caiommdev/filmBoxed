import React, { useState, useEffect } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
  ScrollView
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ColourPalet from '../../AppColours/ColourPalete';
import ApiService from '../../services/ApiService';

const FilterModal = ({ visible, onClose, onApplyFilters }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    loadGenres();
  }, []);

  const loadGenres = async () => {
    try {
      const genresList = await ApiService.getGenres();
      setGenres(genresList);
    } catch (error) {
      console.error('Erro ao carregar gêneros:', error);
    }
  };

  const toggleGenre = (genreId) => {
    setSelectedGenres(prev => 
      prev.includes(genreId)
        ? prev.filter(id => id !== genreId)
        : [...prev, genreId]
    );
  };

  const handleApply = () => {
    onApplyFilters({
      with_genres: selectedGenres.join(','),
    });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Filtros</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color={ColourPalet.text} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.genreList}>
            <Text style={styles.sectionTitle}>Gêneros</Text>
            <View style={styles.genreGrid}>
              {genres.map(genre => (
                <TouchableOpacity
                  key={genre.id}
                  style={[
                    styles.genreButton,
                    selectedGenres.includes(genre.id) && styles.selectedGenre
                  ]}
                  onPress={() => toggleGenre(genre.id)}
                >
                  <Text 
                    style={[
                      styles.genreText,
                      selectedGenres.includes(genre.id) && styles.selectedGenreText
                    ]}
                  >
                    {genre.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <TouchableOpacity 
            style={[
              styles.applyButton,
              selectedGenres.length > 0 && styles.applyButtonActive
            ]}
            onPress={handleApply}
          >
            <Text style={styles.applyButtonText}>
              {selectedGenres.length > 0 
                ? `Aplicar ${selectedGenres.length} filtro${selectedGenres.length > 1 ? 's' : ''}`
                : 'Selecione os filtros'
              }
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: ColourPalet.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: ColourPalet.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: ColourPalet.text,
    fontSize: 16,
    marginBottom: 10,
  },
  genreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  genreButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#2D2D2D',
    margin: 5,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedGenre: {
    backgroundColor: ColourPalet.primary,
    borderColor: ColourPalet.highlight,
  },
  genreText: {
    color: ColourPalet.text,
  },
  selectedGenreText: {
    color: ColourPalet.highlight,
    fontWeight: 'bold',
  },
  applyButton: {
    backgroundColor: '#2D2D2D',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  applyButtonActive: {
    backgroundColor: ColourPalet.highlight,
  },
  applyButtonText: {
    color: ColourPalet.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FilterModal;