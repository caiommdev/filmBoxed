import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import ColourPalet from "../../AppColours/ColourPalete";
import Icon from 'react-native-vector-icons/MaterialIcons';
import ApiService from "../../services/ApiService";

export default function FilmInfo(props) {
  const movie = props.data;

  if (movie == undefined) {
    return <Text>.</Text>;
  }
  return (
    <View key={movie.id} style={styles.container}>
      <Image
        source={{ uri: ApiService.getPosterUrl(movie.poster_path, 500) }}
        style={styles.image}
        alt={movie.title}
      />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.text}>Release Date: {movie.release_date}</Text>
      <Text style={styles.text}>Rating: {movie.vote_average}</Text>
      <Text style={styles.text}>{movie.overview}</Text>
      <Icon name="assessment" size={30} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  image: {
    width: 200,
    height: 300,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: ColourPalet.text,
  },
  text: {
    color: ColourPalet.text,
  }
});
