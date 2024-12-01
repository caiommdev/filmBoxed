import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import ColourPalet from "../AppColours/ColourPalete";
import FetchData from "../components/fetchData/FetchData";
import FilmInfo from "../components/film/FilmInfo";

export default function FilmDetails(props) {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;
  const [movie, setMovie] = useState();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText} onPress={() => navigation.goBack()}>Voltar</Text>
        <Text style={styles.headerText}>Movie</Text>
      </View>
      <FetchData
        setData={(dt) => {
          setMovie(dt);
        }}
        route={"3/movie/" + id}
      >
        <FilmInfo data={movie} />
      </FetchData>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: ColourPalet.primary,
    color: ColourPalet.text,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "start",
  },
  headerText: {
    color: ColourPalet.text,
  }
});