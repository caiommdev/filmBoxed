import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, StyleSheet, Dimensions } from "react-native";

import ColourPalet from "../AppColours/ColourPalete";
import FetchData from "../components/fetchData/FetchData";
import FilmThumbnail from "../components/film/filmThumbnail";
import ControlBar from "../components/controlBar/ControlBar";
import TextButton from "../components/inputs/textButton/TextButton";

const { width } = Dimensions.get("window")

export default function FilmList(props) {
  const [movies, setMovies] = useState([]);
  const [page, _setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const setPage = (p) => {
    if (p > 0 && p < totalPages) {
      _setPage(p);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.page}>
        <Text>All Movies</Text>
        <FetchData
          setData={(dt) => {
            setMovies(dt.results);
            setPage(dt.page);
            setTotalPages(dt.total_pages);
          }}
          queryParams={{
            include_adult: false,
            sort_by: "popularity.desc",
            language: "en_US",
            include_video: false,
            page: page,
          }}
          route={"3/discover/movie"}
        >

          <View style={styles.film}>
            {movies?.map((movie, i) => (
              <FilmThumbnail data={movie} key={"film-info" + i} />
            ))}
          </View>
        </FetchData>

        <ControlBar>
          <TextButton highlight onPress={() => setPage(page - 1)}>
            «
          </TextButton>
          <Text>{page}/{totalPages}</Text>
          <TextButton highlight onPress={() => setPage(page + 1)}>
            »
          </TextButton>
        </ControlBar>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: ColourPalet.primary,
    color: ColourPalet.text,
  },
  page: {
    display: "flex",
    flexDirection: "column",
    gap: "2vh",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  film: {
    display: "flex",
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: "center",
    justifyContent: "center",
    width: width
  },
});
