import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import FetchData from "../components/fetchData/FetchData";
import FilmInfo from "../components/film/FilmInfo";

export default function FilmDetails(props) {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;
  const [movie, setMovie] = useState();

  return (
    <View>
      <View style={styles.header}>
        <Text onPress={() => navigation.goBack()}>Voltar</Text>
        <Text>Movie</Text>
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
  header: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "start",
  },
});
