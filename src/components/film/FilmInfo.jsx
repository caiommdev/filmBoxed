import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import ResizePoster from "./ResizePoster";
import ColourPalet from "../../AppColours/ColourPalete";
import Icon from 'react-native-vector-icons/MaterialIcons';
import ApiService from "../../services/ApiService";

const { width } = Dimensions.get('window');

export default function FilmInfo(props) {
  const movie = props.data;

  if (movie == undefined) {
    return <Text>.</Text>;
  }
  return (
    <View key={movie.id} style={styles.container}>
      <ResizePoster
        max={0.9}
        min={0.4}
        multiplier={width}
        uri={ApiService.getPosterUrl(movie.poster_path, 500) }
      />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.text}> Release: {movie.release_date}</Text>
      <Text style={styles.text}> Score: {movie.vote_average} / 10</Text>
      <Text style={styles.text}>           _</Text>
      <Text style={styles.text}>{movie.overview}</Text>
      <View>
        <Icon name="assessment" size={30} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: ColourPalet.highlight,
  },
  text: {
    color: ColourPalet.text,
  }
});
