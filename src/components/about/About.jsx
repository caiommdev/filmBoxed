import React from "react";
import { View, Text, StyleSheet } from "react-native";

function About() {
  return (
    <View style={styles.mainContent}>
      <View style={styles.sectionMain}>
        <Text style={styles.heading}>Filmes Populares</Text>
        <Text style={styles.paragraph}>
          Explore a lista dos filmes mais populares disponíveis na nossa base de
          dados, utilizando a API do The Movie Database (TMDb). O design é
          focado em mobile first, garantindo que sua experiência seja perfeita
          tanto em dispositivos móveis quanto em telas maiores.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContent: {
    padding: 20,
  },
  sectionMain: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  paragraph: {
    fontSize: 16,
  },
});

export default About;
