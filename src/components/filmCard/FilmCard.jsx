import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import ColourPalete from '../../AppColours/ColourPalete';

export default function FilmCard(props) {
  const movie = props.data;
  return (
    <View key={movie.id} style={styles.card}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.infoTitle}>{movie.title}</Text>
        <Text style={styles.infoText}>Data de lançamento: {movie.release_date}</Text>
        <Text style={styles.infoText}>Avaliação: {movie.vote_average}</Text>
        <Text style={styles.infoText}>{movie.overview}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    flex: 1
  },
  card: {
    backgroundColor: ColourPalete.primary.color,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    margin: 10,
    width: 200,
    overflow: 'hidden',
    transition: 'transform 0.3s',
    flex: 1
  },
  cardHover: {
    transform: [{ scale: 1.05 }],
    flex: 1
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    flex: 1
  },
  info: {
    padding: 10,
    textAlign: 'left',
    flex: 1
  },
  infoTitle: {
    fontSize: 18,
    marginVertical: 10,
    flex: 1
  },
  infoText: {
    fontSize: 14,
    color: ColourPalete.dim.color,
    marginVertical: 5,
    flex: 1
  },
  // Estilos responsivos podem ser tratados com lógica condicional no componente
});